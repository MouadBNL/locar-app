import type { ReactNode } from 'react';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export interface StatisticCardProps {
  label: string;
  stat: string;
  trend?: number;
  footer?: () => ReactNode;
}
export function StatisticCard(props: StatisticCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{props.label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {props.stat}
        </CardTitle>
        {
          props.trend && (
            <CardAction>
              <Badge variant="outline">
                {props.trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                {props.trend > 0 ? '+' : '-'}
                {Math.abs(props.trend).toFixed(2)}
                %
              </Badge>
            </CardAction>
          )
        }
      </CardHeader>
      {props.footer && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {props.footer()}
        </CardFooter>
      )}
    </Card>
  );
}
