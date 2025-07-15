<?php

namespace App\Http\Requests;

use App\Models\RentalDocument;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read string $type
 * @property-read string $document_id
 * @property-read string $description
 */
class RentalDocumentCreateRequest extends FormRequest
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
            'type' => 'string|required|min:3|max:255',
            'document_id' => 'uuid|required|exists:documents,id',
            'description' => 'string|nullable|min:3|max:255',
        ];
    }
}
