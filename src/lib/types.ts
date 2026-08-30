export type TripStatus = "aanvraag" | "gepland" | "afgerond";

export type Toll = {
  id: string;
  label: string;
  amount: number;
};

export type RouteDef = {
  id: string;
  service: string;
  via: string;
  days: number;
  drivingHours: number;
  fuelTotal: number;
  fuelLuxembourg: number;
  tolls: Toll[];
  hint: string;
};

export type ExtraCost = {
  id: string;
  label: string;
  amount: number;
};

export type Actuals = {
  outboundRevenue: number;
  returnRevenue: number;
  fuel: number;
  tolls: number;
  wageDays: number;
  depotDays: number;
  extraCosts: ExtraCost[];
  notes: string;
};

export type Trip = {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  status: TripStatus;
  routeId: string;
  destination: string;
  customer: string;
  outboundRevenue: number;
  returnRevenue: number;
  extraDepotDays: number;
  extraCosts: ExtraCost[];
  notes: string;
  actual?: Actuals;
};

export type Settings = {
  driverDayRate: number;
  depotDayCost: number;
  targetMarginPct: number;
  routes: RouteDef[];
};

export type Draft = {
  routeId: string;
  destination: string;
  customer: string;
  outboundRevenue: string;
  returnRevenue: string;
  hasReturn: boolean;
  extraDepotDays: number;
  extraCosts: ExtraCost[];
  notes: string;
  date: string;
};

export type CostBreakdown = {
  fuel: number;
  fuelLuxembourg: number;
  fuelRest: number;
  tolls: number;
  tollLines: Toll[];
  wage: number;
  days: number;
  drivingHours: number;
  driverDayRate: number;
  depot: number;
  extra: number;
  extraLines: ExtraCost[];
  total: number;
};

export type MarginResult = {
  revenue: number;
  outboundRevenue: number;
  returnRevenue: number;
  costs: CostBreakdown;
  profit: number;
  marginPct: number | null;
  breakEvenRevenue: number;
  returnForTarget: number;
  targetMarginPct: number;
  depotDayImpact: number;
};
