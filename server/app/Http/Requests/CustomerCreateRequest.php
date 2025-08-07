<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerCreateRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',

            'id_card_number' => 'nullable|string|max:255',
            'id_card_issuing_date' => 'nullable|date',
            'id_card_expiration_date' => 'nullable|date',
            'id_card_address' => 'nullable|string|max:1024',

            'driver_license_number' => 'nullable|string|max:255',
            'driver_license_issuing_date' => 'nullable|date',
            'driver_license_expiration_date' => 'nullable|date',
            'driver_license_address' => 'nullable|string|max:1024',

            'passport_number' => 'nullable|string|max:255',
            'passport_issuing_date' => 'nullable|date',
            'passport_expiration_date' => 'nullable|date',
            'passport_address' => 'nullable|string|max:1024',
        ];
    }
}
