<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read ?string $date
 * @property-read ?string $title
 * @property-read ?string $document_id
 * @property-read ?string $location
 * @property-read ?string $vehicle_id
 * @property-read ?string $rental_id
 * @property-read ?string $customer_id
 */
class TrafficInfractionCreateRequest extends FormRequest
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
            'date' => 'nullable|date',
            'title' => 'nullable|string|max:255',
            'document_id' => 'nullable|exists:documents,id',
            'location' => 'nullable|string|max:255',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'rental_id' => 'nullable|exists:rentals,id',
            'customer_id' => 'nullable|exists:customers,id',
        ];
    }
}
