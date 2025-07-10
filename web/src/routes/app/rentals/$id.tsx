import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3 } from "@/components/ui/typography";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { DownloadIcon, PlayIcon } from "lucide-react";

import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { VehicleSummaryCard } from "@/components/blocks/vehicle-summary-card";
import { CustomerSummaryCard } from "@/components/blocks/customer-summary-card";
import { PeriodSummaryCard } from "@/components/blocks/period-summary-card";
import { RentalRepository } from "@/repositories";

export const Route = createFileRoute("/app/rentals/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const rental = await RentalRepository.show(params.id);
    return { rental };
  },
});

function RouteComponent() {
  const { id: code } = Route.useParams();
  const { rental } = Route.useLoaderData();

  if (!rental) {
    return <div>Rental not found</div>;
  }

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-8">
          <Heading3>Rental #{code}</Heading3>
          <Badge variant="outline" className="gap-2 text-sm">
            <span
              className="size-1.5 rounded-full bg-accent-foreground"
              aria-hidden="true"
            ></span>
            Draft
          </Badge>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline">
            <DownloadIcon className="w-4 h-4" />
            Generate Agreement
          </Button>

          <Button variant="outline">
            <PlayIcon className="w-4 h-4" />
            Start Location
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent>
          <div className="flex space-x-4 h-26 items-center">
            <div className="w-full">
              <CustomerSummaryCard
                id={rental.customer.id}
                firstName={rental.customer?.full_name?.split(" ")[0] ?? ""}
                lastName={rental.customer?.full_name?.split(" ")[1] ?? ""}
                id_number={rental.customer.id_number ?? ""}
                license={rental.customer.license_number ?? ""}
                phone={rental.customer.phone ?? ""}
                address={rental.customer.address1 ?? ""}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <PeriodSummaryCard
                pickupDate={rental.period.pickup_date ?? ""}
                dropoffDate={rental.period.return_date ?? ""}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <VehicleSummaryCard
                id={rental.vehicle.id}
                make={rental.vehicle.brand ?? ""}
                model={rental.vehicle.model ?? ""}
                year={rental.vehicle.year ?? 0}
                plate={rental.vehicle.plate_number ?? ""}
                doors={rental.vehicle.doors ?? 0}
                transmission={rental.vehicle.transmission ?? ""}
                fuel={rental.vehicle.fuel_type ?? ""}
                color={rental.vehicle.color ?? ""}
                seats={rental.vehicle.seats ?? 0}
                mileage={rental.vehicle.mileage ?? 0}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <DetailsSection />
    </div>
  );
}

export default function DetailsSection() {
  const router = useRouter();
  const { id } = Route.useParams();

  const [currentPath, setCurrentPath] = useState(
    router.state.location.pathname
  );

  // Determine current tab from pathname
  const activeTab = currentPath.endsWith("/payments")
    ? "payments"
    : currentPath.endsWith("/documents")
    ? "documents"
    : "summary";

  const basePath = `/app/rentals/${id}`;

  function handleTabChange(value: string) {
    const target = value === "summary" ? basePath : `${basePath}/${value}`;
    setCurrentPath(target);
    router.navigate({ to: target });
  }

  return (
    <div>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <ScrollArea>
          <TabsList className="justify-start before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 px-4 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
            <TabsTrigger
              value="summary"
              className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            >
              <HouseIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            >
              <PanelsTopLeftIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            >
              <BoxIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Payments
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>

      <div className="border rounded-md p-4">
        <Outlet />
      </div>
    </div>
  );
}
