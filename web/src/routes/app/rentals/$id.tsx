import type { RentalData } from '@/features/rentals';
import { createFileRoute } from '@tanstack/react-router';
import {
  DownloadIcon,
  EyeIcon,
  FileCheck2Icon,
  FileStackIcon,
  FileTextIcon,
  LayoutPanelLeft,
  PlayIcon,
  ReceiptTextIcon,
  TrafficConeIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CustomerSummaryCard } from '@/components/blocks/customer-summary-card';

import { PeriodSummaryCard } from '@/components/blocks/period-summary-card';
import { RentalReturnForm } from '@/components/blocks/rental-return-form';
import { RentalStartForm } from '@/components/blocks/rental-start-form';
import { RentalStatusBadge } from '@/components/blocks/rental-status-badge';
import { VehicleSummaryCard } from '@/components/blocks/vehicle-summary-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { Heading3 } from '@/components/ui/typography';
import {
  useRentalAgreementGenerate,
  useRentalReturn,
  useRentalShow,
  useRentalStart,
} from '@/features/rentals';

export const Route = createFileRoute('/app/rentals/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const rental = await useRentalShow.prefetch({ number: params.id });

    return { rental: rental.data, meta: {
      breadcrumb: {
        title: `${rental.data.rental_number}`,
      },
    } };
  },
});

function RouteComponent() {
  const { id: code } = Route.useParams();
  const { t } = useTranslation(['rental', 'common', 'traffic']);
  const { data } = useRentalShow({ number: code });
  const rental = data?.data;

  if (!rental) {
    return <div>{t('rental:not_found')}</div>;
  }

  return (
    <div className="pt-8 px-4 lg:px-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-8">
          <Heading3>
            {t('rental:label_singular')}
            {' '}
            #
            {code}
          </Heading3>
          <RentalStatusBadge status={rental.status ?? 'draft'} />
        </div>

        <div className="flex space-x-2">
          {rental.status === 'draft' && (
            <>
              <RentalAgreementAction code={code} rental={rental} />
              <RentalStartAction code={code} rental={rental} />
            </>
          )}

          {rental.status === 'started' && (
            <>
              <Button variant="outline">
                <EyeIcon className="w-4 h-4" />
                {t('rental:view_agreement')}
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
                id={rental.renter.customer_id ?? ''}
                firstName={rental.renter?.full_name?.split(' ')[0] ?? ''}
                lastName={rental.renter?.full_name?.split(' ')[1] ?? ''}
                id_number={rental.renter.identifier ?? ''}
                license={rental.renter.driver_license_number ?? ''}
                phone={rental.renter.phone ?? ''}
                address={rental.renter.address_primary ?? ''}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <PeriodSummaryCard
                pickupDate={rental.timeframe.departure_date ?? ''}
                dropoffDate={rental.timeframe.return_date ?? ''}
                rentalDays={rental.timeframe.total_days ?? 0}
              />
            </div>
            <Separator orientation="vertical" />
            <div className="w-full">
              <VehicleSummaryCard
                id={rental.vehicle.vehicle_id ?? ''}
                make={rental.vehicle.make ?? ''}
                model={rental.vehicle.model ?? ''}
                year={rental.vehicle.year ?? 0}
                plate={rental.vehicle.license_plate ?? ''}
                doors={rental.vehicle.doors ?? 0}
                transmission={rental.vehicle.transmission ?? 'unknown'}
                fuel={rental.vehicle.fuel_type ?? ''}
                color={rental.vehicle.color ?? ''}
                seats={rental.vehicle.seats ?? 0}
                mileage={rental.vehicle.mileage ?? 0}
                attributes={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <TabsNavigation
        basePath={`/app/rentals/${code}`}
        tabs={[
          {
            label: (
              <>
                <LayoutPanelLeft
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                {t('rental:summary')}
              </>
            ),
            path: '',
          },
          {
            label: (
              <>
                <FileStackIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                {t('rental:documents')}
              </>
            ),
            path: 'documents',
          },
          {
            label: (
              <>
                <ReceiptTextIcon
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                {t('rental:payments')}
              </>
            ),
            path: 'payments',
          },
          {
            label: (
              <>
                <TrafficConeIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                {t('traffic:label_plural')}
              </>
            ),
            path: 'traffic-infractions',
          },
        ]}
      />
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
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['rental', 'common']);
  const { mutate: startRental, isPending: isStartingRental } = useRentalStart({
    onSuccess: () => {
      toast.success(t('rental:action.start.success'));
      useRentalShow.invalidate({ number: code });
      setOpen(false);
    },
    onError: () => {
      toast.error(t('rental:action.start.error'));
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlayIcon className="w-4 h-4" />
          {t('rental:start_rental')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('rental:start_rental')}</DialogTitle>
          <DialogDescription>
            {t('rental:start_rental_description')}
          </DialogDescription>
        </DialogHeader>
        <div>
          <RentalStartForm
            submit={data => startRental({ id: code, data })}
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
  const { t } = useTranslation(['rental', 'common']);
  const [open, setOpen] = useState(false);

  const { mutate: returnRental, isPending: isReturningRental }
    = useRentalReturn({
      onSuccess: () => {
        toast.success(t('rental:action.return.success'));
        useRentalShow.invalidate({ number: code });
        setOpen(false);
      },
      onError: () => {
        toast.error(t('rental:action.return.error'));
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileCheck2Icon className="w-4 h-4" />
          {t('rental:return_rental')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('rental:return_rental')}</DialogTitle>
          <DialogDescription>
            {t('rental:return_rental_description')}
          </DialogDescription>
        </DialogHeader>
        <div>
          <RentalReturnForm
            submit={data => returnRental({ id: code, data })}
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
  const { t } = useTranslation(['rental', 'common']);
  const { mutate: generateAgreement, isPending: isGeneratingAgreement }
    = useRentalAgreementGenerate({
      onSuccess: (data) => {
        toast.success(t('rental:action.generate_agreement.success'));
        if (data.data.url) {
          window.open(data.data.url, '_blank');
        }
        useRentalShow.invalidate({ number: code });
      },
      onError: () => {
        toast.error(t('rental:action.generate_agreement.error'));
      },
    });

  if (rental.agreement_document) {
    return (
      <Button variant="outline" asChild>
        <a href={rental.agreement_document.url} target="_blank">
          <FileTextIcon className="w-4 h-4" />
          {t('rental:view_agreement')}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => generateAgreement({ code })}
      loading={isGeneratingAgreement}
    >
      <DownloadIcon className="w-4 h-4" />
      {t('rental:generate_agreement')}
    </Button>
  );
}
