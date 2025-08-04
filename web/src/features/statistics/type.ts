export interface VehicleStatistics {
  rental_count: number;
  expenses_count: number;
  reservation_count: number;
  repairs_count: number;
  revenue: number;
  expenses: number;
  revenue_per_day: RevenuePerDayData[];
  expenses_per_day: ExpensesPerDayData[];
  expenses_per_type: VehicleExpensesPerTypeData[];
}

export interface GlobalStatistics {
  rental_count: number;
  expenses_count: number;
  reservation_count: number;
  revenue: number;
  expenses: number;
  revenue_per_day: RevenuePerDayData[];
  expenses_per_day: ExpensesPerDayData[];
}

export interface RevenuePerDayData extends PerDayData {}
export interface ExpensesPerDayData extends PerDayData {}

export interface PerDayData {
  day: string;
  count: number;
  total: number;
}

export interface VehicleExpensesPerTypeData {
  type: string;
  count: number;
  total: number;
}
