import { Badge } from '../ui/badge';

export function VehicleLicensePlateBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline">
      {children}
    </Badge>
  );
}
