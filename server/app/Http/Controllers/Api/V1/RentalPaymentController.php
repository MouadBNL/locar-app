<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalChargesSummaryData;
use App\Http\Requests\RentalPaymentCreateRequest;
use App\Http\Resources\RentalPaymentResource;
use App\Models\Rental;
use App\Models\RentalPayment;

class RentalPaymentController extends ApiController
{
    public function index($rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $payments = $rental->payments()->get();

        return $this->success([
            'meta' => RentalChargesSummaryData::fromRental($rental),
            'payments' => RentalPaymentResource::collection($payments),
        ]);
    }

    public function store(RentalPaymentCreateRequest $request, $rental_number)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $payment = $rental->payments()->create($request->validated());

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.store.success');
    }

    public function show($rental_number, $payment)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $payment = RentalPayment::findOrFail($payment);
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.show.error.not_found', 404);
        }

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.show.success');
    }

    public function update(RentalPaymentCreateRequest $request, $rental_number, $payment)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $payment = RentalPayment::findOrFail($payment);
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.update.error.not_found', 404);
        }

        $payment->update($request->validated());

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.update.success');
    }

    public function destroy($rental_number, $payment)
    {
        $rental = Rental::where('rental_number', $rental_number)->firstOrFail();
        $payment = RentalPayment::findOrFail($payment);
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.destroy.error.not_found', 404);
        }

        $payment->delete();

        return $this->success(null, 'rental.payment.destroy.success');
    }
}
