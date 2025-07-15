import {
  rentalDocumentTypeMap,
  type RentalDocumentResource,
} from "@/features/rental-documents";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export type RentalDocumentTableProps = {
  rentalDocuments: RentalDocumentResource[];
  actions?: (rentalDocument: RentalDocumentResource) => React.ReactNode;
};
export const RentalDocumentTable = ({
  rentalDocuments,
  actions,
}: RentalDocumentTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentalDocuments.map((rentalDocument) => (
            <TableRow key={rentalDocument.id}>
              <TableCell>{rentalDocument.document.filename}</TableCell>
              <TableCell>
                {rentalDocumentTypeMap[rentalDocument.type] ?? "Unknown"}
              </TableCell>
              <TableCell>{rentalDocument.description}</TableCell>
              <TableCell>{actions?.(rentalDocument)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
