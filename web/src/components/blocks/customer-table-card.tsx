import { PhoneIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type CustomerTableCardProps = {
  id: string;
  fullName: string;
  identifier: string;
  phone: string;
};
export function CustomerTableCard(props: CustomerTableCardProps) {
  return (
    <div className="flex gap-6 w-full justify-start items-center">
      <div>
        <p className="text-sm">{props.fullName}</p>
        <p className="text-muted-foreground text-xs">
          <span className="font-bold">ID:</span> {props.identifier}
        </p>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" disabled={!props.phone}>
              <PhoneIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.phone}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
