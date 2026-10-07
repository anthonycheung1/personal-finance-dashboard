import type {
  ETF,
  Property,
  CashAccount,
  SuperAccount,
  NetWorthHistory
} from '../types/finance';

export const etfHoldings: ETF[] = [
  {
    id: 1,
    ticker: 'VDHG',
    name: 'Vanguard Diversified High Growth Index ETF',
    units: 421,
    currentPrice: 77.15,
    averagePurchasePrice: 47.28
  },
  {
    id: 2,
    ticker: 'VDAL',
    name: 'Vanguard Australian Shares High Yield ETF',
    units: 40,
    currentPrice: 58.46,
    averagePurchasePrice: 57.30
  },
  {
    id: 3,
    ticker: 'V500',
    name: 'Vanguard US Total Market Shares Index ETF',
    units: 29,
    currentPrice: 55.13,
    averagePurchasePrice: 55.45
  },
  {
    id: 4,
    ticker: 'NDQ',
    name: 'BetaShares NASDAQ 100 ETF',
    units: 18,
    currentPrice: 57.80,
    averagePurchasePrice: 51.20
  }
];

export const properties: Property[] = [
  {
    id: 1,
    name: 'Sydney Residence',
    suburb: 'Mascot',
    currentValue: 1650000,
    mortgageBalance: 720000,
    interestRate: 6.09,
    offsetBalance: 185000,
    weeklyRentalIncome: 0,
    annualExpenses: 8500
  },
  {
    id: 2,
    name: 'Parramatta Investment Property',
    suburb: 'Parramatta',
    currentValue: 850000,
    mortgageBalance: 610000,
    interestRate: 6.39,
    offsetBalance: 0,
    weeklyRentalIncome: 720,
    annualExpenses: 12500
  }
];

export const cashAccounts: CashAccount[] = [
  {
    id: 1,
    accountName: 'Everyday Account',
    balance: 8500
  },
  {
    id: 2,
    accountName: 'Emergency Savings',
    balance: 32000
  }
];

export const superAccounts: SuperAccount[] = [
  {
    id: 1,
    fundName: 'AustralianSuper',
    investmentOption: 'Balanced',
    balance: 185000
  },
  {
    id: 2,
    fundName: 'Hostplus',
    investmentOption: 'Indexed High Growth',
    balance: 72000
  }
];

export const netWorthHistory: NetWorthHistory[] = [
  { date: new Date('2025-10-01'), netWorth: 720000 },
  { date: new Date('2025-11-01'), netWorth: 735000 },
  { date: new Date('2025-12-01'), netWorth: 748000 },
  { date: new Date('2026-01-01'), netWorth: 755000 },
  { date: new Date('2026-02-01'), netWorth: 771000 },
  { date: new Date('2026-03-01'), netWorth: 786000 },
  { date: new Date('2026-04-01'), netWorth: 798000 },
  { date: new Date('2026-05-01'), netWorth: 815000 },
  { date: new Date('2026-06-01'), netWorth: 829000 },
  { date: new Date('2026-07-01'), netWorth: 842000 },
  { date: new Date('2026-08-01'), netWorth: 858000 },
  { date: new Date('2026-09-01'), netWorth: 875000 }
];