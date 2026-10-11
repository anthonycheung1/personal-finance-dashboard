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
import ProjectionChart from '../components/Charts/ProjectionChart';

type ProjectionsProps = {
  etfs: ETF[];
};

// Default projection assumptions.
const DEFAULT_MONTHLY_CONTRIBUTION = 1000;
const DEFAULT_ANNUAL_RETURN = 7;
const DEFAULT_YEARS = 10;

// Use the ETF holdings passed down from App so projections reflect the current portfolio.
function Projections(props: ProjectionsProps) {
  const [monthlyContribution, setMonthlyContribution] = useState(DEFAULT_MONTHLY_CONTRIBUTION);
  const [annualReturn, setAnnualReturn] = useState(DEFAULT_ANNUAL_RETURN);
  const [years, setYears] = useState(DEFAULT_YEARS);

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

  // Include the current portfolio value as the starting point of the chart.
  const chartProjection = [
    {
      year: 0,
      balance: currentPortfolioValue
    },
    ...projection
  ];

  // Restore all projection assumptions to their default values.
  function handleReset() {
    setMonthlyContribution(DEFAULT_MONTHLY_CONTRIBUTION);
    setAnnualReturn(DEFAULT_ANNUAL_RETURN);
    setYears(DEFAULT_YEARS);
  }

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

              <input
                type="number"
                min="0"
                max="10000"
                step="50"
                value={monthlyContribution}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value !== '') {
                    setMonthlyContribution(
                      Math.min(10000, Math.max(0, Number(value)))
                    );
                  }
                }}
              />

              <input
                type="range"
                min="0"
                max="10000"
                step="50"
                value={monthlyContribution}
                onChange={(event) =>
                  setMonthlyContribution(Number(event.target.value))
                }
                aria-label="Monthly contribution slider"
              />

              <span>
                {formatCurrency(monthlyContribution)} per month
              </span>
            </label>

            <label>
              Assumed annual return (%)

              <input
                type="number"
                min="-99"
                max="100"
                step="0.5"
                value={annualReturn}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value !== '') {
                    setAnnualReturn(
                      Math.min(100, Math.max(-99, Number(value)))
                    );
                  }
                }}
              />

              <input
                type="range"
                min="-99"
                max="100"
                step="0.5"
                value={annualReturn}
                onChange={(event) =>
                  setAnnualReturn(Number(event.target.value))
                }
                aria-label="Assumed annual return slider"
              />

              <span>
                {formatPercentage(annualReturn)} annual return
              </span>
            </label>

            <label>
              Projection period (years)

              <input
                type="number"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value !== '') {
                    setYears(
                      Math.min(50, Math.max(1, Math.floor(Number(value))))
                    );
                  }
                }}
              />

              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(event) =>
                  setYears(Number(event.target.value))
                }
                aria-label="Projection period slider"
              />

              <span>
                {years} {years === 1 ? 'year' : 'years'}
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={handleReset}
            >
              Reset assumptions
            </button>
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
          Projected ETF portfolio growth
        </h2>

        <p className="page-intro">
          Estimated portfolio value at the end of each year, including your current holdings and future contributions.
        </p>

        <ProjectionChart
          data={chartProjection}
          years={years}
        />
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