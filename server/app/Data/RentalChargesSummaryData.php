<?php

namespace App\Data;

use App\Enums\RentalPaymentType;
use App\Models\Rental;
use Spatie\LaravelData\Data;

class RentalChargesSummaryData extends Data
{
    public function __construct(
        public float $day_rate,
        public float $day_quantity,
        public float $day_total,
        public float $extra_rate,
        public float $extra_quantity,
        public float $extra_total,
        public float $insurance_rate,
        public float $insurance_quantity,
        public float $insurance_total,
        public float $total,
        public float $paid,
        public float $due,
        public float $deposit,
        public float $refunded,
        public float $refund_due,
    ) {}


    public static function fromRental(Rental $rental): self
    {
        $rental->load(['rate', 'payments']);

        $rate = $rental->rate;

        $day_rate = $rate->day_rate ?? 0;
        $day_quantity = $rate->day_quantity ?? 0;
        $day_total = $day_rate * $day_quantity;

        $extra_rate = $rate->extra_rate ?? 0;
        $extra_quantity = $rate->extra_quantity ?? 0;
        $extra_total = $extra_rate * $extra_quantity;

        $insurance_rate = $rate->insurance_rate ?? 0;
        $insurance_quantity = $rate->insurance_quantity ?? 0;
        $insurance_total = $insurance_rate * $insurance_quantity;

        $total = $day_total + $extra_total + $insurance_total;
        $paid = $rental->payments->where('type', RentalPaymentType::NORMAL)->sum('amount') ?? 0;
        $due = $total - $paid;
        $deposit = $rental->payments->where('type', RentalPaymentType::DEPOSIT)->sum('amount') ?? 0;
        $refunded = $rental->payments->where('type', RentalPaymentType::REFUND)->sum('amount') ?? 0;
        $refund_due = $deposit - $refunded;

        return new self(
            day_rate: $day_rate,
            day_quantity: $day_quantity,
            day_total: $day_total,
            extra_rate: $extra_rate,
            extra_quantity: $extra_quantity,
            extra_total: $extra_total,
            insurance_rate: $insurance_rate,
            insurance_quantity: $insurance_quantity,
            insurance_total: $insurance_total,
            total: $total,
            paid: $paid,
            due: $due,
            deposit: $deposit,
            refunded: $refunded,
            refund_due: $refund_due,
        );
    }
}
