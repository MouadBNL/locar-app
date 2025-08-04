import type {
  ChartConfig,
} from '@/components/ui/chart';
import type { VehicleStatistics } from '@/features/statistics';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { get_date, get_date_enum } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export function VehicleSummaryChart({ data }: { data: VehicleStatistics }) {
  const { t } = useTranslation(['stats']);
  const chartConfig = {
    income: {
      label: 'Income',
    },
    revenue: {
      label: t('stats:revenue'),
      color: 'var(--color-green-300)',
    },
    expenses: {
      label: t('stats:expenses'),
      color: 'var(--color-red-300)',
    },
  } satisfies ChartConfig;

  const [period, setPeriod] = useState('30');
  const chartData = get_date_enum(
    get_date({ day: -Number(period) }),
    get_date(),
  ).map((date) => {
    return {
      day: date.toISOString().split('T')[0],
      revenue: data.revenue_per_day?.find(item => item.day === date.toISOString().split('T')[0])?.total ?? 0,
      expenses: data.expenses_per_day?.find(item => item.day === date.toISOString().split('T')[0])?.total ?? 0,
    };
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{t('stats:revenue_expenses')}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {t('stats:last_3_months')}
          </span>
          <span className="@[540px]/card:hidden">
            {t('stats:last_3_months')}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={period}
            onValueChange={setPeriod}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90">{t('stats:last_3_months')}</ToggleGroupItem>
            <ToggleGroupItem value="30">{t('stats:last_30_days')}</ToggleGroupItem>
            <ToggleGroupItem value="7">{t('stats:last_7_days')}</ToggleGroupItem>
          </ToggleGroup>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder={t('stats:last_3_months')} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90" className="rounded-lg">
                {t('stats:last_3_months')}
              </SelectItem>
              <SelectItem value="30" className="rounded-lg">
                {t('stats:last_30_days')}
              </SelectItem>
              <SelectItem value="7" className="rounded-lg">
                {t('stats:last_7_days')}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={chartData}>
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              labelFormatter={(value) => {
                return value;
              }}

              content={(
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
