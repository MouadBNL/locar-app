export type VehicleTableCardProps = {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
};

export function VehicleTableCard(props: VehicleTableCardProps) {
  return (
    <div>
      <p className="text-sm">
        {props.make} {props.model} {props.year}
      </p>
      <p className="text-muted-foreground text-xs">{props.license_plate}</p>
    </div>
  );
}
