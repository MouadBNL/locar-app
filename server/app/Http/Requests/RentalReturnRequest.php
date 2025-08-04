<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read string $actual_return_date
 * @property-read int $mileage
 * @property-read array{
 *     rating: int,
 *     comment: ?string,
 * } $customer
 */
class RentalReturnRequest extends FormRequest
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
            'actual_return_date' => ['required', 'date'],
            'mileage' => ['required', 'integer', 'min:0'],
            'customer' => [
                'rating' => ['required', 'integer', 'min:0', 'max:5'],
                'comment' => ['nullable', 'string'],
            ],
        ];
    }
}
