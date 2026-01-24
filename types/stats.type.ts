import { RangeOptionId } from ".";

export type StatsType = {
  period: {
    start: string;
    end: string;
    period: RangeOptionId;
  };
  counts: {
    parishioners: number;
    baptisms: number;
    confirmations: number;
    marriages: number;
    visitors: number;
  };
  finance: {
    totalIncome: number;
    incomeCount: number;
    totalExpenditure: number;
    expenditureCount: number;
    netBalance: number;
  };
};
