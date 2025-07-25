import { Badge } from "@/components/ui/badge";
import type { CustomerStatus } from "@/features/customers";
import { str_to_titlecase } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  if (status.status === "booked") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/app/reservations/$id" params={{ id: status.entity_id }}>
            <Badge variant="outline" className="gap-2">
              <span
                className={`size-1.5 rounded-full bg-yellow-500`}
                aria-hidden="true"
              ></span>
              {str_to_titlecase(status.status)}
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view reservation</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (status.status === "renting") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/app/rentals/$id" params={{ id: status.entity_id }}>
            <Badge variant="outline" className="gap-2">
              <span
                className={`size-1.5 rounded-full bg-emerald-500`}
                aria-hidden="true"
              ></span>
              {str_to_titlecase(status.status)}
            </Badge>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view rental</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Badge variant="outline" className="gap-2">
      <span
        className={`size-1.5 rounded-full bg-accent-foreground`}
        aria-hidden="true"
      ></span>
      {str_to_titlecase(status.status)}
    </Badge>
  );
}
