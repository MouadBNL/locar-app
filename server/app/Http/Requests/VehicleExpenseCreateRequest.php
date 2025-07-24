<?php

namespace App\Http\Requests;

use App\Enums\VehicleExpenseType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VehicleExpenseCreateRequest extends FormRequest
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
            'type' => ['required', 'string', Rule::enum(VehicleExpenseType::class)],
            'amount' => 'required|numeric|min:0',
            'date' => 'nullable|date',
            'title' => 'nullable|string',
            'reference' => 'nullable|string',
            'receipt_document_id' => 'nullable|uuid|exists:documents,id',
            'notes' => 'nullable|string',
        ];
    }
}
