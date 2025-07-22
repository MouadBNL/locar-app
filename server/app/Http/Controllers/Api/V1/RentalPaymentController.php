<?php

namespace App\Http\Controllers\Api\V1;

use App\Data\RentalChargesSummaryData;
use App\Http\Requests\RentalPaymentCreateRequest;
use App\Http\Resources\RentalPaymentResource;
use App\Models\Rental;
use App\Models\RentalPayment;

class RentalPaymentController extends ApiController
{
    public function index(Rental $rental)
    {
        $payments = $rental->payments()->get();

        return $this->success([
            'meta' => RentalChargesSummaryData::fromRental($rental),
            'payments' => RentalPaymentResource::collection($payments),
        ]);
    }

    public function store(Rental $rental, RentalPaymentCreateRequest $request)
    {
        $payment = $rental->payments()->create($request->validated());

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.store.success');
    }

    public function show(Rental $rental, RentalPayment $payment)
    {
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.show.error.not_found', 404);
        }

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.show.success');
    }

    public function update(Rental $rental, RentalPayment $payment, RentalPaymentCreateRequest $request)
    {
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.update.error.not_found', 404);
        }

        $payment->update($request->validated());

        return $this->success(new RentalPaymentResource($payment), 'rental.payment.update.success');
    }

    public function destroy(Rental $rental, RentalPayment $payment)
    {
        if ($payment->rental_id !== $rental->id) {
            return $this->error('rental.payment.destroy.error.not_found', 404);
        }

        $payment->delete();

        return $this->success(null, 'rental.payment.destroy.success');
    }
}
