export function DateCard({ date }: { date: string }) {
  const d = new Date(date);
  return (
    <div>
      <p className="text-sm">{d.toLocaleDateString("en-UK")}</p>
      <p className="text-xs text-muted-foreground">
        {d.toLocaleTimeString("en-UK")}
      </p>
    </div>
  );
}
