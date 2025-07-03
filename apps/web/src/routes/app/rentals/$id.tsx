import { CarDoorIcon } from "@/components/icons/car-door-icon";
import { CarEngineIcon } from "@/components/icons/car-engine-icon";
import { CarSeatIcon } from "@/components/icons/car-seat-icon";
import { CarTransmissionIcon } from "@/components/icons/car-transmission-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3 } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";
import {
  CarIcon,
  CircleGaugeIcon,
  DownloadIcon,
  PaintBucketIcon,
  PlayIcon,
} from "lucide-react";

import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/rentals/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id: code } = Route.useParams();

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
              <CustomerCard />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <RentalPeriodCard />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <CarCard />
            </div>
          </div>
        </CardContent>
      </Card>

      <DetailsSection />
    </div>
  );
}

const RentalPeriodCard = () => {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex flex-col items-start justify-center">
        <span className="text-xs text-muted-foreground">Pickup date</span>
        <span className="text-lg font-bold">Mon Jan 10</span>
        <span className="text-sm text-muted-foreground">10:00 AM</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="block text-sm mb-2 text-muted-foreground">5 days</span>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <div className="w-24 h-0.5 relative text-muted-foreground bg-gradient-to-r from-muted-foreground/0 via-muted-foreground/100 to-muted-foreground/0">
            <CarIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-1 rounded-full h-8 w-8 bg-radial from-card/100  from-70% to-card/0" />
          </div>
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        <span className="text-xs text-muted-foreground">Dropoff date</span>
        <span className="text-lg font-bold">Mon Jan 15</span>
        <span className="text-sm text-muted-foreground">18:00 PM</span>
      </div>
    </div>
  );
};

const CarCard = () => {
  return (
    <div className="flex h-full w-full items-start justify-between gap-4">
      <div>
        <Avatar className="size-12 rounded-lg">
          <AvatarImage src="#" />
          <AvatarFallback className="rounded-lg">DL</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h4 className="text-lg font-bold -mb-1">Dacia Logan 2025</h4>
          <h5 className="text-sm text-muted-foreground">16624 | A | 26</h5>
        </div>
        <div className="grid grid-cols-3 text-sm gap-2">
          <div className="flex gap-2 items-center">
            <CarDoorIcon className="size-4" />{" "}
            <span className="text-muted-foreground">4 doors</span>
          </div>
          <div className="flex gap-2 items-center">
            <CarTransmissionIcon className="size-4" />{" "}
            <span className="text-muted-foreground">Automatic</span>
          </div>
          <div className="flex gap-2 items-center">
            <CarEngineIcon className="size-4" />{" "}
            <span className="text-muted-foreground">Gasoline</span>
          </div>
          <div className="flex gap-2 items-center">
            <PaintBucketIcon className="size-4" />{" "}
            <span className="text-muted-foreground">Red</span>
          </div>
          <div className="flex gap-2 items-center">
            <CarSeatIcon className="size-4" />{" "}
            <span className="text-muted-foreground">5 seats</span>
          </div>
          <div className="flex gap-2 items-center">
            <CircleGaugeIcon className="size-4" />{" "}
            <span className="text-muted-foreground">80 000 km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerCard = () => {
  return (
    <div className="flex h-full w-full items-start justify-between gap-4">
      <div>
        <Avatar className="size-12 rounded-lg">
          <AvatarImage src="#" />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="mb-4">
          <h4 className="text-lg font-bold -mb-1">Customer Name</h4>
          <h5 className="text-sm text-muted-foreground">06 66 66 66 66</h5>
        </div>
        <div className="grid grid-cols-2 text-sm gap-2">
          <div className="flex gap-2 items-center">
            <span>ID Number:</span>{" "}
            <span className="text-muted-foreground">GE12345</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>License:</span>{" "}
            <span className="text-muted-foreground">L123456</span>
          </div>
          <div className="flex gap-2 items-center col-span-2">
            <span>Address:</span>{" "}
            <span className="text-muted-foreground">
              123 Main St, Anytown, USA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DetailsSection() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="justify-start before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 px-4 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          <TabsTrigger
            value="tab-1"
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
            value="tab-2"
            className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <PanelsTopLeftIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <BoxIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Packages
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
          Content for Tab 1
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
          Content for Tab 2
        </p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
          Content for Tab 3
        </p>
      </TabsContent>
    </Tabs>
  );
}
