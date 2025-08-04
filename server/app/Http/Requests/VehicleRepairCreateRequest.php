<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $started_at
 * @property string $finished_at
 * @property string $cancelled_at
 * @property string $title
 * @property string $reference
 * @property string $notes
 * @property string $receipt_document_id
 * @property array<int, string>|null $expenses
 */
class VehicleRepairCreateRequest extends FormRequest
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
            'started_at' => 'required|date',
            'finished_at' => 'nullable|date|after:started_at',
            'cancelled_at' => 'nullable|date',
            'title' => 'nullable|string',
            'reference' => 'nullable|string',
            'notes' => 'nullable|string',
            'receipt_document_id' => 'nullable|uuid|exists:documents,id',
            'expenses' => 'nullable|array',
            'expenses.*' => 'nullable|uuid|exists:vehicle_expenses,id',
        ];
    }
}
