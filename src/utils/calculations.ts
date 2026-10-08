import type {
  ETF,
  Property,
  CashAccount,
  SuperAccount,
  MortgagePayment
} from '../types/finance';

export function getETFCurrentValue(etf: ETF): number {
  return etf.units * etf.currentPrice;
}

export function getETFTotalCost(etf: ETF): number {
  return etf.units * etf.averagePurchasePrice;
}

export function getETFDollarGainLoss(etf: ETF): number {
  return getETFCurrentValue(etf) - getETFTotalCost(etf);
}

export function getETFPercentageGainLoss(etf: ETF): number {
  const totalCost = getETFTotalCost(etf);

  if (totalCost === 0) {
    return 0;
  }

  return (getETFDollarGainLoss(etf) / totalCost) * 100;
}

export function getTotalETFValue(etfs: ETF[]): number {
  return etfs.reduce((total, etf) => total + getETFCurrentValue(etf), 0);
}

export function getTotalETFCost(etfs: ETF[]): number {
  return etfs.reduce((total, etf) => total + getETFTotalCost(etf), 0);
}

export function getPropertyEquity(property: Property): number {
  return (property.currentValue - property.mortgageBalance + property.offsetBalance);
}

export function getPropertyLVR(property: Property): number {
  if (property.currentValue <= 0) {
    return 0;
  }

  return (property.mortgageBalance / property.currentValue * 100);
}

export function getPropertyAnnualRentalIncome(property: Property): number {
  return property.weeklyRentalIncome * 52;
}

export function getPropertyAnnualInterest(property: Property): number {
  const interestBearingBalance = Math.max(0, property.mortgageBalance - property.offsetBalance);

  return interestBearingBalance * (property.interestRate / 100);
}

export function getPropertyCashFlow(property: Property): number {
  return (getPropertyAnnualRentalIncome(property) - getPropertyAnnualInterest(property) - property.annualExpenses);
}

export function getTotalPropertyEquity(properties: Property[]): number {
  return properties.reduce((total, property) => total + getPropertyEquity(property), 0);
}

export function getTotalPropertyMortgage(properties: Property[]): number {
  return properties.reduce((total, property) => total + property.mortgageBalance, 0);
}

export function getTotalPropertyAnnualRentalIncome(properties: Property[]): number {
  return properties.reduce((total, property) => total + getPropertyAnnualRentalIncome(property), 0);
}

export function getTotalPropertyAnnualInterest(properties: Property[]): number {
  return properties.reduce((total, property) => total + getPropertyAnnualInterest(property), 0);
}

export function getTotalPropertyCashFlow(properties: Property[]): number {
  return properties.reduce((total, property) => total + getPropertyCashFlow(property), 0);
}

export function getTotalCash(cashAccounts: CashAccount[]): number {
  return cashAccounts.reduce((total, account) => total + account.balance, 0);
}

export function getTotalSuperannuationBalance(superAccounts: SuperAccount[]): number {
  return superAccounts.reduce((total, account) => total + account.balance, 0);
}

export function getNetWorth(etfs: ETF[], properties: Property[], superAccounts: SuperAccount[], cashAccounts: CashAccount[]): number {
  return (getTotalETFValue(etfs) + getTotalPropertyEquity(properties) + getTotalSuperannuationBalance(superAccounts) + getTotalCash(cashAccounts));
}

export function getMonthlyMortgagePayment(principal: number, annualInterestRate: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) {
    return 0;
  }

  const numberOfPayments = termYears * 12;
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  if (monthlyInterestRate === 0) {
    return principal / numberOfPayments;
  }

  const rateFactor = Math.pow(1 + monthlyInterestRate, numberOfPayments);

  return (principal * (monthlyInterestRate * rateFactor) / (rateFactor - 1));
}

export function getMortgageAmortisationSchedule(principal: number, annualInterestRate: number, termYears: number): MortgagePayment[] {
  if (principal <= 0 || annualInterestRate < 0 || termYears <= 0 || !Number.isInteger(termYears)) {
    return [];
  }

  const monthlyPayment = getMonthlyMortgagePayment(principal, annualInterestRate, termYears);

  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const numberOfPayments = termYears * 12;

  const schedule: MortgagePayment[] = [];

  let balance = principal;

  for (let month = 1; month <= numberOfPayments; month++) {
    const interest = balance * monthlyInterestRate;

    const principalPaid = Math.min(balance, monthlyPayment - interest);

    balance = Math.max(0, balance - principalPaid);

    schedule.push({month, payment: principalPaid + interest, principal: principalPaid, interest, balance});
  }

  return schedule;
}