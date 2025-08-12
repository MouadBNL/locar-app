<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\DocumentCreateRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;

class DocumentController extends ApiController
{
    public function store(DocumentCreateRequest $request)
    {
        /** @var mixed $auth */
        $auth = auth(); // for skipping type errors

        $request->validated();
        $document = Document::create([
            'filename' => now()->format('Ymd').'_'.$request->file->getClientOriginalName(),
            'original_filename' => $request->file->getClientOriginalName(),
            'disk' => 'public',
            'path' => $request->file->storeAs(
                'documents',
                now()->format('Ymd').'_'.$request->file->getClientOriginalName(),
                'public'
            ),
            'mime_type' => $request->file->getClientMimeType(),
            'size' => $request->file->getSize(),
            'uploaded_for' => $request->for ?? 'unknown',
            'uploaded_by' => $auth->user()->id,
        ]);

        return $this->success(new DocumentResource($document), 'document.store.success');
    }

    public function show($document)
    {
        $document = Document::findOrFail($document);

        return $this->success(new DocumentResource($document), 'document.show.success');
    }
}
