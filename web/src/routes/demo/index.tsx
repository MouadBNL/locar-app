import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { SingleFileUpload } from "@/components/blocks/single-file-upload";
import { DocumentUpload } from "@/components/blocks/document-upload";
import { useState } from "react";

export const Route = createFileRoute("/demo/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [documentId, setDocumentId] = useState<string | null>(
    "67cf2e35-730a-4786-967a-f0323b15c267"
  );
  return (
    <div className="flex items-center justify-center gap-3 h-screen">
      <div className="container grid grid-cols-2 gap-16">
        <Card>
          <CardContent>
            <SingleFileUpload />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <DocumentUpload
              value={documentId}
              onChange={(value) => setDocumentId(value)}
            />
            <p className="mt-4">{documentId ?? "NULL"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
