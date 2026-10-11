import { useState } from 'react';

import MortgageCalculator from '../components/UI/MortgageCalculator';
import MortgageChart from '../components/Charts/MortgageChart';
import StatCard from '../components/UI/StatCard';
import PageLayout from '../components/Layout/PageLayout';

import {
  getMonthlyMortgagePayment,
  getMortgageAmortisationSchedule
} from '../utils/calculations';

import { formatCurrency } from '../utils/formatters';

function Mortgage() {
  const [principal, setPrincipal] = useState<number | ''>(700000);
  const [interestRate, setInterestRate] = useState<number | ''>(6.09);
  const [termYears, setTermYears] = useState<number | ''>(30);
  const [principalError, setPrincipalError] = useState<string | null>(null);
  const [interestRateError, setInterestRateError] = useState<string | null>(null);
  const [termYearsError, setTermYearsError] = useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  function handleCalculate() {
    const validPrincipal = principal !== '' && principal > 0;
    const validRate = interestRate !== '' && interestRate >= 0;
    const validTerm = termYears !== '' && termYears > 0 && Number.isInteger(termYears);

    setPrincipalError(validPrincipal ? null : 'Loan amount must be greater than zero.');
    setInterestRateError(validRate ? null : 'Interest rate cannot be negative.');
    setTermYearsError(validTerm ? null : 'Loan term must be a whole number greater than zero.');
    setHasCalculated(validPrincipal && validRate && validTerm);
  }

  const isInputValid = principal !== '' && principal > 0 && interestRate !== '' && interestRate >= 0 && termYears !== '' && termYears > 0 && Number.isInteger(termYears);
  const schedule = hasCalculated && isInputValid ? getMortgageAmortisationSchedule(principal, interestRate, termYears) : [];
  const monthlyPayment = hasCalculated && isInputValid ? getMonthlyMortgagePayment(principal, interestRate, termYears) : null;
  const totalInterest = schedule.reduce((total, payment) => total + payment.interest, 0);
  const totalRepayment = schedule.reduce((total, payment) => total + payment.payment, 0);

  return (
    <PageLayout title="Mortgage Calculator">
      <section className="dashboard-section">
        <h2>
          Mortgage details
        </h2>

        <MortgageCalculator
          principal={principal}
          interestRate={interestRate}
          termYears={termYears}
          principalError={principalError}
          interestRateError={interestRateError}
          termYearsError={termYearsError}
          onPrincipalChange={(value) => {
            setPrincipal(value);
            setHasCalculated(false);
          }}
          onInterestRateChange={(value) => {
            setInterestRate(value);
            setHasCalculated(false);
          }}
          onTermYearsChange={(value) => {
            setTermYears(value);
            setHasCalculated(false);
          }}
          onCalculate={handleCalculate}
        />
      </section>

      {monthlyPayment !== null && (
        <>
          <section className="dashboard-section">
            <h2>
              Repayment summary
            </h2>

            <div className="top-level-metrics-grid">
              <StatCard
                title="Monthly repayment"
                value={formatCurrency(monthlyPayment)}
              />

              <StatCard
                title="Total interest"
                value={formatCurrency(totalInterest)}
              />

              <StatCard
                title="Total repayment"
                value={formatCurrency(totalRepayment)}
              />
            </div>
          </section>

          <section className="dashboard-section">
            <h2>
              Mortgage balance over time
            </h2>

            <MortgageChart schedule={schedule} />
          </section>

          <section className="dashboard-section">
            <h2>
              Amortisation schedule
            </h2>

            <details
              onToggle={(event) => {
                const details = event.currentTarget;
                details.querySelector('summary')!.textContent = details.open
                  ? 'Hide amortisation schedule'
                  : 'Show amortisation schedule';
              }}
            >
              <summary>
                Show amortisation schedule
              </summary>

              <div className="table-container table-container--scrollable">
                <table>
                  <caption>
                    Monthly mortgage repayments and remaining balance
                  </caption>

                  <thead>
                    <tr>
                      <th scope="col">Month</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Principal</th>
                      <th scope="col">Interest</th>
                      <th scope="col">Remaining balance</th>
                    </tr>
                  </thead>

                  <tbody>
                    {schedule.map((payment) => (
                      <tr key={payment.month}>
                        <td>{payment.month}</td>
                        <td>{formatCurrency(payment.payment)}</td>
                        <td>{formatCurrency(payment.principal)}</td>
                        <td>{formatCurrency(payment.interest)}</td>
                        <td>{formatCurrency(payment.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>
        </>
      )}
    </PageLayout>
  );
}

export default Mortgage;