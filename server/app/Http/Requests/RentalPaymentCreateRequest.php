<?php

namespace App\Http\Requests;

use App\Enums\RentalPaymentMethod;
use App\Enums\RentalPaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

/**
 * @property-read RentalPaymentType $type
 * @property-read RentalPaymentMethod $method
 * @property-read float $amount
 * @property-read Carbon $date
 * @property-read ?string $receipt_document_id
 * @property-read ?string $reference
 * @property-read ?string $notes
 */
class RentalPaymentCreateRequest extends FormRequest
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
            'type' => ['required', 'string', Rule::enum(RentalPaymentType::class)],
            'method' => ['required', 'string', Rule::enum(RentalPaymentMethod::class)],
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'receipt_document_id' => ['nullable', 'uuid', 'exists:documents,id'],
            'reference' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
