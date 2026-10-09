import {
  etfHoldings,
  properties,
  cashAccounts,
  superAccounts
} from './data/financialData';

import {
  getTotalETFValue,
  getTotalETFCost,
  getTotalPropertyEquity,
  getTotalPropertyCashFlow,
  getTotalCash,
  getTotalSuperannuationBalance,
  getNetWorth
} from './utils/calculations';

import {
  formatCurrency,
  formatNumber
} from './utils/formatters';

function App() {
  const totalETFValue = getTotalETFValue(etfHoldings);
  const totalETFCost = getTotalETFCost(etfHoldings);
  const totalPropertyEquity = getTotalPropertyEquity(properties);
  const totalPropertyCashFlow = getTotalPropertyCashFlow(properties);
  const totalCash = getTotalCash(cashAccounts);
  const totalSuper = getTotalSuperannuationBalance(superAccounts);
  const netWorth = getNetWorth(
    etfHoldings,
    properties,
    superAccounts,
    cashAccounts
  );

  return (
    <main>
      <h1>Personal Finance Dashboard</h1>
      <section>
        <h2>Portfolio summary</h2>
        <p>ETF value: {formatCurrency(totalETFValue)}</p>
        <p>ETF cost: {formatCurrency(totalETFCost)}</p>
        <p>Property equity: {formatCurrency(totalPropertyEquity)}</p>
        <p>Property cash flow: {formatCurrency(totalPropertyCashFlow)}</p>
        <p>Cash: {formatCurrency(totalCash)}</p>
        <p>Superannuation: {formatCurrency(totalSuper)}</p>
        <p>Net worth: {formatCurrency(netWorth)}</p>
        <p>ETF holdings: {formatNumber(etfHoldings.length)}</p>
      </section>
    </main>
  );
}

export default App;