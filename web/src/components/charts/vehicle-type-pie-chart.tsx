import type { ChartConfig } from '../ui/chart';
import type { VehicleStatistics } from '@/features/statistics';
import { useTranslation } from 'react-i18next';
import { Pie, PieChart } from 'recharts';
import { VehicleExpenseTypeEnum } from '@/features/vehicle-expenses';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const COLORS = {
  fuel: 'var(--color-red-400)',
  car_wash: 'var(--color-orange-400)',
  tires: 'var(--color-yellow-400)',
  oil_change: 'var(--color-green-400)',
  tax: 'var(--color-blue-500)',
  brakes: 'var(--color-purple-400)',
  diagnostic: 'var(--color-pink-400)',
  inspection: 'var(--color-gray-400)',
  electrician: 'var(--color-cyan-400)',
  insurance: 'var(--color-teal-400)',
  mechanic: 'var(--color-indigo-400)',
  parking: 'var(--color-lime-400)',
  spare_parts: 'var(--color-amber-400)',
  other: 'var(--color-fuchsia-400)',
};

export function VehicleTypePieChart({ data }: { data: VehicleStatistics }) {
  const { t } = useTranslation(['stats', 'expenses']);
  const chartConfig = {
    total: {
      label: 'Total',
    },
    count: {
      label: 'Count',
    },
    [VehicleExpenseTypeEnum.fuel]: {
      label: t('expenses:type_enum.fuel'),
      color: COLORS.fuel,
    },
    [VehicleExpenseTypeEnum.car_wash]: {
      label: t('expenses:type_enum.car_wash'),
      color: COLORS.car_wash,
    },
    [VehicleExpenseTypeEnum.tires]: {
      label: t('expenses:type_enum.tires'),
      color: COLORS.tires,
    },
    [VehicleExpenseTypeEnum.oil_change]: {
      label: t('expenses:type_enum.oil_change'),
      color: COLORS.oil_change,
    },
    [VehicleExpenseTypeEnum.tax]: {
      label: t('expenses:type_enum.tax'),
      color: COLORS.tax,
    },
    [VehicleExpenseTypeEnum.brakes]: {
      label: t('expenses:type_enum.brakes'),
      color: COLORS.brakes,
    },
    [VehicleExpenseTypeEnum.diagnostic]: {
      label: t('expenses:type_enum.diagnostic'),
      color: COLORS.diagnostic,
    },
    [VehicleExpenseTypeEnum.inspection]: {
      label: t('expenses:type_enum.inspection'),
      color: COLORS.inspection,
    },
    [VehicleExpenseTypeEnum.electrician]: {
      label: t('expenses:type_enum.electrician'),
      color: COLORS.electrician,
    },
    [VehicleExpenseTypeEnum.insurance]: {
      label: t('expenses:type_enum.insurance'),
      color: COLORS.insurance,
    },
    [VehicleExpenseTypeEnum.mechanic]: {
      label: t('expenses:type_enum.mechanic'),
      color: COLORS.mechanic,
    },
    [VehicleExpenseTypeEnum.parking]: {
      label: t('expenses:type_enum.parking'),
      color: COLORS.parking,
    },
    [VehicleExpenseTypeEnum.spare_parts]: {
      label: t('expenses:type_enum.spare_parts'),
      color: COLORS.spare_parts,
    },
    [VehicleExpenseTypeEnum.other]: {
      label: t('expenses:type_enum.other'),
      color: COLORS.other,
    },
  } satisfies ChartConfig;
  const chartData = Object.keys(VehicleExpenseTypeEnum).map((type) => {
    return {
      type,
      total: data.expenses_per_type?.find(item => item.type === type)?.total ?? 0,
      count: data.expenses_per_type?.find(item => item.type === type)?.count ?? 0,
      fill: COLORS[type as keyof typeof COLORS],
    };
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{t('stats:expenses_by_type')}</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart data={chartData}>
            <Pie data={chartData.map(e => ({ type: e.type, total: e.total, fill: e.fill, key: 'total' }))} dataKey="total" outerRadius={90} />
            <Pie
              data={chartData.map(e => ({ type: e.type, count: e.count, fill: e.fill, key: 'count' }))}
              dataKey="count"
              innerRadius={100}
              outerRadius={120}
            />

            <ChartTooltip
              content={(
                <ChartTooltipContent
                  labelKey="type"
                  nameKey="key"
                  indicator="line"
                />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
