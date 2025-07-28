import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { DocumentUpload } from '@/components/blocks/document-upload';
import { Card, CardContent } from '@/components/ui/card';
import { DateTimeInput } from '@/components/ui/datetime-input';

export const Route = createFileRoute('/demo/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [documentId, setDocumentId] = useState<string | null>(
    '67cf2e35-730a-4786-967a-f0323b15c267',
  );

  const [date, setDate] = useState<string>(new Date().toISOString());
  return (
    <div className="flex items-center justify-center gap-3 h-screen">
      <div className="container grid grid-cols-1 gap-16 mx-auto">
        <Card>
          <CardContent>
            <DateTimeInput
              type="string"
              value={date}
              onChange={value => setDate(value)}
            />
            <p>{date}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <DocumentUpload
              value={documentId}
              onChange={value => setDocumentId(value)}
            />
            <p className="mt-4">{documentId ?? 'NULL'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
