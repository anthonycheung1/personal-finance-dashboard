
import { useState } from 'react';

import type { ETF } from '../types/finance';

import {
  getTotalETFValue
} from '../utils/calculations';

import {
  formatCurrency,
  formatPercentage
} from '../utils/formatters';

import PageLayout from '../components/Layout/PageLayout';
import StatCard from '../components/UI/StatCard';

type ProjectionsProps = {
  etfs: ETF[];
};

// Use the ETF holdings passed down from App so projections reflect the current portfolio.
function Projections(props: ProjectionsProps) {
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(10);

  const currentPortfolioValue = getTotalETFValue(props.etfs);

  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;

  let balance = currentPortfolioValue;

  const projection = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }

    projection.push({year, balance});
  }

  const projectedValue = projection.length > 0 ? projection[projection.length - 1].balance : currentPortfolioValue;

  const totalContributions = monthlyContribution * years * 12;

  const estimatedGrowth = projectedValue - currentPortfolioValue - totalContributions;

  return (
    <PageLayout title="Financial Projections">
      <p className="page-intro">
        Explore how different contribution and return assumptions affect a hypothetical ETF portfolio over time.
      </p>

      <section className="dashboard-section">
        <h2>Projection assumptions</h2>

        <div className="form-card data-form">
          <div className="form-grid">
            <label>
              Monthly contribution (AUD)

              <input type="number" min="0" step="50" value={monthlyContribution} onChange={(event) => setMonthlyContribution(Math.max(0, Number(event.target.value)))} />
            </label>

            <label>
              Assumed annual return (%)

              <input type="number" min="-99" max="100" step="0.5" value={annualReturn} onChange={(event) => setAnnualReturn(Number(event.target.value))} />
            </label>

            <label>
              Projection period (years)

              <input type="number" min="1" max="50" step="1" value={years} onChange={(event) => setYears(Math.min(50, Math.max(1, Math.floor(Number(event.target.value)))))} />
            </label>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>
          Illustrative outcome
        </h2>

        <div className="top-level-metrics-grid">
          <StatCard
            title="Current ETF value"
            value={formatCurrency(currentPortfolioValue)}
          />

          <StatCard
            title="Projected portfolio value"
            value={formatCurrency(projectedValue)}
          />

          <StatCard
            title="Total new contributions"
            value={formatCurrency(totalContributions)}
          />

          <StatCard
            title="Estimated investment growth"
            value={formatCurrency(estimatedGrowth)}
            subtitle={`Assumed annual return: ${formatPercentage(annualReturn)}`}
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2>
          Year-by-year projection
        </h2>

        <div className="table-container table-container--scrollable">
          <table>
            <caption>
              Illustrative end-of-year portfolio values
            </caption>

            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Projected value</th>
              </tr>
            </thead>

            <tbody>
              {projection.map((entry) => (
                <tr key={entry.year}>
                  <td>{entry.year}</td>
                  <td>{formatCurrency(entry.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="disclaimer">
          These figures are illustrative calculations based on the assumptions entered. They do not account for tax, fees, inflation, market volatility or changes in contributions.
        </p>
      </section>
    </PageLayout>
  );
}

export default Projections;