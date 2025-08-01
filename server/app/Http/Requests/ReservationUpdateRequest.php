<?php

namespace App\Http\Requests;

use App\Models\Reservation;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read Reservation $reservation
 */
class ReservationUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'reservation_number' => 'required|string|unique:reservations,reservation_number,' . $this->reservation->id,
            'customer_id' => 'required|exists:customers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'daily_rate' => 'required|numeric|min:0',
            'total_days' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'deposit' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ];
    }
}
