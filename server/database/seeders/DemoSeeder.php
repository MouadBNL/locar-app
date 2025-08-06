<?php

namespace Database\Seeders;

use App\Data\AvailabilityCheckData;
use App\Enums\VehicleExpenseType;
use App\Models\Customer;
use App\Models\CustomerRating;
use App\Models\Rental;
use App\Models\RentalRate;
use App\Models\RentalTimeframe;
use App\Models\RentalVehicle;
use App\Models\Renter;
use App\Models\Reservation;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Vehicle;
use App\Services\AvailabilityCheckService;
use App\Services\TimeframeService;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function __construct(
        private TimeframeService $timeframeService,
        private AvailabilityCheckService $availabilityCheckService,
    ) {}

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $tenant1 = Tenant::create([
            'id' => 'demo',
        ]);

        $tenant2 = Tenant::create([
            'id' => 'locar',
        ]);

        User::create([
            'tenant_id' => $tenant1->id,
            'name' => 'Demo Admin',
            'email' => 'admin@demo.locar.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'tenant_id' => $tenant2->id,
            'name' => 'Locar Admin',
            'email' => 'admin@locar.locar.com',
            'password' => Hash::make('password'),
        ]);

        sleep(1);

        Tenant::all()->runForEach(function () use ($faker) {

            Customer::factory(10)->create();
            Vehicle::factory(10)->create();

            foreach (Vehicle::all() as $vehicle) {

                $total_days = rand(365 * 1, 365 * 2);
                $time = Carbon::now()->subDays($total_days);

                $entities_count = ceil($total_days / 8);

                for ($i = 0; $i < $entities_count; $i++) {

                    $start = $time->copy()->addDays(rand(1, 3));
                    $end = $start->copy()->addDays(rand(1, 5));
                    $customer = $this->getAvailableCustomers($vehicle, $start, $end);

                    if (! $customer) {
                        $time = $end->copy()->addDays(1);

                        continue;
                    }

                    $chance = rand(0, 20);
                    if ($chance >= 18) {
                        // Repair
                        $repair = $vehicle->repairs()->create([
                            'started_at' => $start,
                            'finished_at' => $end,
                            'cancelled_at' => null,
                            'title' => $faker->sentence,
                            'reference' => $faker->sentence,
                            'notes' => $faker->paragraph,
                            'receipt_document_id' => null,
                        ]);
                        $repair->expenses()->createMany(
                            array_map(fn () => [
                                'vehicle_id' => $vehicle->id,
                                'vehicle_repair_id' => $repair->id,
                                'type' => VehicleExpenseType::values()[rand(0, count(VehicleExpenseType::values()) - 1)],
                                'amount' => rand(100, 1000),
                                'date' => $start->copy()->addHours(rand(0, 3))->addMinutes(rand(0, 59))->addSeconds(rand(0, 59)),
                                'title' => $faker->sentence,
                                'reference' => $faker->sentence,
                                'receipt_document_id' => null,
                                'notes' => $faker->paragraph,
                            ], range(0, rand(1, 3)))
                        );
                    } elseif ($chance >= 12) {
                        // Reservation
                        $daily_rate = rand(2, 9) * 100;
                        $total_days = $this->timeframeService->diffInDays($start, $end);

                        Reservation::create([
                            'reservation_number' => 'RES-'.str()->random(16),
                            'customer_id' => $customer->id,
                            'vehicle_id' => $vehicle->id,
                            'check_in_date' => $start,
                            'check_out_date' => $end,
                            'daily_rate' => $daily_rate,
                            'total_days' => $total_days,
                            'total_price' => $daily_rate * $total_days,
                            'deposit' => $daily_rate * $total_days * 0.5,
                            'notes' => $faker->paragraph(3),
                        ]);
                    } else {
                        // Rental
                        $rental = Rental::create([
                            'rental_number' => 'RNT-'.str()->random(16),
                            'notes' => $faker->paragraph(3),
                        ]);

                        $timeframe = RentalTimeframe::create([
                            'rental_id' => $rental->id,
                            'departure_date' => $start,
                            'return_date' => $end,
                            'actual_departure_date' => $start->isBefore(Carbon::now()) ? $start->copy()->addHours(rand(0, 3))->addMinutes(rand(0, 59))->addSeconds(rand(0, 59)) : null,
                            'actual_return_date' => $end->isBefore(Carbon::now()) ? $end->copy()->addHours(rand(0, 3))->addMinutes(rand(0, 59))->addSeconds(rand(0, 59)) : null,
                            'total_days' => $this->timeframeService->diffInDays($start, $end),
                        ]);

                        if ($timeframe->actual_return_date) {
                            CustomerRating::create([
                                'customer_id' => $customer->id,
                                'rental_id' => $rental->id,
                                'rating' => rand(0, 10) / 2,
                                'comment' => $faker->paragraph,
                            ]);
                        }

                        $rental_vehicle = RentalVehicle::create([
                            'rental_id' => $rental->id,
                            'vehicle_id' => $vehicle->id,
                            'make' => $vehicle->make,
                            'model' => $vehicle->model,
                            'year' => $vehicle->first_service_date->year,
                            'license_plate' => $vehicle->license_plate,
                        ]);

                        $renter = Renter::create([
                            'rental_id' => $rental->id,
                            'customer_id' => $customer->id,
                            'full_name' => $customer->first_name.' '.$customer->last_name,
                            'phone' => $customer->phone,
                            'email' => $customer->email,

                            'id_card_number' => $customer->id_card_number,
                            'birth_date' => $customer->birth_date,
                            'address_primary' => $customer->address,
                            'address_secondary' => $customer->address,

                            'driver_license_number' => $customer->driver_license_number,
                            'driver_license_issuing_city' => $customer->driver_license_issuing_city,
                            'driver_license_issuing_date' => $customer->driver_license_issuing_date,
                            'driver_license_expiration_date' => $customer->driver_license_expiration_date,

                            'passport_number' => $customer->passport_number,
                            'passport_country' => $customer->passport_country,
                            'passport_issuing_date' => $customer->passport_issuing_date,
                            'passport_expiration_date' => $customer->passport_expiration_date,

                            'id_card_scan_document' => $customer->id_card_scan_document,
                            'driver_license_scan_document' => $customer->driver_license_scan_document,
                        ]);

                        $day_quantity = $this->timeframeService->diffInDays($start, $end);
                        $day_rate = rand(2, 9) * 100;
                        $day_total = $day_quantity * $day_rate;
                        $discount = rand(0, 100);

                        $rate = RentalRate::create([
                            'rental_id' => $rental->id,

                            'day_quantity' => $day_quantity,
                            'day_rate' => $day_rate,
                            'day_total' => $day_total,

                            'extra_quantity' => 0,
                            'extra_rate' => 0,
                            'extra_total' => 0,

                            'discount' => $discount,

                            'total' => $day_total - $discount,
                        ]);
                    }

                    $time = $end->copy()->addDays(1);
                }
            }
        });
    }

    protected function getAvailableCustomers(Vehicle $vehicle, Carbon $start, Carbon $end)
    {
        $customers = Customer::inRandomOrder()->get();

        foreach ($customers as $customer) {

            $availability = $this->availabilityCheckService->check(new AvailabilityCheckData(
                vehicle: $vehicle,
                customer: $customer,
                start_date: $start,
                end_date: $end,
                options: null,
            ));

            if ($availability->available) {
                return $customer;
            }
        }

        return null;
    }
}
