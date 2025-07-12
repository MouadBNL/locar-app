<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleUpdateRequest extends FormRequest
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
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'license_plate' => 'required|string|max:255',
            'mileage' => 'required|integer|min:0',
            'fuel_type' => 'required|string|in:gasoline,diesel,electric,hybrid',
            'transmission' => 'required|string|in:AT,MT',
            'number_of_seats' => 'required|integer|min:1',
            'number_of_doors' => 'required|integer|min:1',
            'color' => 'nullable|string|max:255',
            'photo_url' => 'nullable|string|max:255',
        ];
    }
}
