export interface VehicleStatistics {
  rental_count: number;
  expenses_count: number;
  reservation_count: number;
  repairs_count: number;
  revenue: number;
  expenses: number;
  revenue_per_day: VehicleRevenuePerDayData[];
  expenses_per_day: VehicleExpensesPerDayData[];
  expenses_per_type: VehicleExpensesPerTypeData[];
}

export interface VehicleRevenuePerDayData extends PerDayData {}
export interface VehicleExpensesPerDayData extends PerDayData {}

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
