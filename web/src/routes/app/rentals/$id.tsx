import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3 } from "@/components/ui/typography";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import {
  CircleArrowOutDownLeft,
  DownloadIcon,
  EyeIcon,
  FileStackIcon,
  FileTextIcon,
  LayoutPanelLeft,
  PlayIcon,
  ReceiptTextIcon,
} from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { VehicleSummaryCard } from "@/components/blocks/vehicle-summary-card";
import { CustomerSummaryCard } from "@/components/blocks/customer-summary-card";
import { PeriodSummaryCard } from "@/components/blocks/period-summary-card";
import {
  rentalShowFn,
  useRentalStart,
  type RentalData,
  useRentalReturn,
  useRentalAgreementGenerate,
} from "@/features/rentals";
import { RentalStatusBadge } from "@/components/blocks/rental-status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RentalStartForm } from "@/components/blocks/rental-start-form";
import { toast } from "sonner";
import { RentalReturnForm } from "@/components/blocks/rental-return-form";

export const Route = createFileRoute("/app/rentals/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await rentalShowFn({ number: params.id });
    return { rental: data.data };
  },
});

function RouteComponent() {
  const { id: code } = Route.useParams();
  const { rental } = Route.useLoaderData();

  console.log({ rental });

  if (!rental) {
    return <div>Rental not found</div>;
  }

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-8">
          <Heading3>Rental #{code}</Heading3>
          <RentalStatusBadge status={rental.status ?? "draft"} />
        </div>

        <div className="flex space-x-2">
          {rental.status === "draft" && (
            <>
              <RentalAgreementAction code={code} rental={rental} />
              <RentalStartAction code={code} rental={rental} />
            </>
          )}

          {rental.status === "started" && (
            <>
              <Button variant="outline">
                <EyeIcon className="w-4 h-4" />
                View Agreement
              </Button>
              <RentalReturnAction code={code} rental={rental} />
            </>
          )}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent>
          <div className="flex space-x-4 h-26 items-center">
            <div className="w-full">
              <CustomerSummaryCard
                id={rental.renter.customer_id ?? ""}
                firstName={rental.renter?.full_name?.split(" ")[0] ?? ""}
                lastName={rental.renter?.full_name?.split(" ")[1] ?? ""}
                id_number={rental.renter.identifier ?? ""}
                license={rental.renter.driver_license_number ?? ""}
                phone={rental.renter.phone ?? ""}
                address={rental.renter.address_primary ?? ""}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <PeriodSummaryCard
                pickupDate={rental.timeframe.departure_date ?? ""}
                dropoffDate={rental.timeframe.return_date ?? ""}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <VehicleSummaryCard
                id={rental.vehicle.vehicle_id ?? ""}
                make={rental.vehicle.make ?? ""}
                model={rental.vehicle.model ?? ""}
                year={rental.vehicle.year ?? 0}
                plate={rental.vehicle.license_plate ?? ""}
                doors={rental.vehicle.doors ?? 0}
                transmission={rental.vehicle.transmission ?? "unknown"}
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

function DetailsSection() {
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
              <LayoutPanelLeft
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
              <FileStackIcon
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
              <ReceiptTextIcon
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

      <div>
        <Outlet />
      </div>
    </div>
  );
}

function RentalStartAction({
  code,
  rental,
}: {
  code: string;
  rental: RentalData;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: startRental, isPending: isStartingRental } = useRentalStart({
    onSuccess: () => {
      toast.success("Rental started successfully");
      router.invalidate({
        filter: (match) => match.id === code,
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to start rental");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlayIcon className="w-4 h-4" />
          Start Rental
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Rental</DialogTitle>
          <DialogDescription>
            Start the rental by providing the actual departure date and mileage.
          </DialogDescription>
        </DialogHeader>
        <div>
          <RentalStartForm
            submit={(data) => startRental({ id: code, data })}
            initialValues={{ mileage: rental.vehicle.mileage }}
            loading={isStartingRental}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RentalReturnAction({
  code,
  rental,
}: {
  code: string;
  rental: RentalData;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: returnRental, isPending: isReturningRental } =
    useRentalReturn({
      onSuccess: () => {
        toast.success("Rental returned successfully");
        router.invalidate({
          filter: (match) => match.id === code,
        });
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to return rental");
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CircleArrowOutDownLeft className="w-4 h-4" />
          Return Rental
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Return Rental</DialogTitle>
          <DialogDescription>
            Return the rental by providing the actual return date and mileage.
          </DialogDescription>
        </DialogHeader>
        <div>
          <RentalReturnForm
            submit={(data) => returnRental({ id: code, data })}
            initialValues={{ mileage: rental.vehicle.mileage }}
            loading={isReturningRental}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RentalAgreementAction({
  code,
  rental,
}: {
  code: string;
  rental: RentalData;
}) {
  if (rental.agreement_document) {
    return (
      <Button variant="outline" asChild>
        <a href={rental.agreement_document.url} target="_blank">
          <FileTextIcon className="w-4 h-4" />
          View Agreement
        </a>
      </Button>
    );
  }
  const router = useRouter();
  const { mutate: generateAgreement, isPending: isGeneratingAgreement } =
    useRentalAgreementGenerate({
      onSuccess: (data) => {
        console.log({ data });
        toast.success("Agreement generated successfully");
        if (data.data.url) {
          window.open(data.data.url, "_blank");
        }
        router.invalidate({
          filter: (match) => match.id === code,
        });
      },
      onError: () => {
        toast.error("Failed to generate agreement");
      },
    });

  return (
    <Button
      variant="outline"
      onClick={() => generateAgreement({ code })}
      loading={isGeneratingAgreement}
    >
      <DownloadIcon className="w-4 h-4" />
      Generate Agreement
    </Button>
  );
}
