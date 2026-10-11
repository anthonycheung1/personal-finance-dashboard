type MortgageCalculatorProps = {
  principal: number | '';
  interestRate: number | '';
  termYears: number | '';
  principalError: string | null;
  interestRateError: string | null;
  termYearsError: string | null;
  onPrincipalChange: (value: number | '') => void;
  onInterestRateChange: (value: number | '') => void;
  onTermYearsChange: (value: number | '') => void;
  onCalculate: () => void;
};

function MortgageCalculator(props: MortgageCalculatorProps) {
  return (
    <form
      className="form-card data-form"
      onSubmit={(event) => {
        event.preventDefault();
        props.onCalculate();
      }}
    >
      <div className="form-grid">
        <label>
          Loan amount (AUD)

          <input
            type="number"
            min="0"
            step="any"
            value={props.principal}
            onChange={(event) => props.onPrincipalChange(event.target.value === '' ? '' : Number(event.target.value))}
            aria-invalid={Boolean(props.principalError)}
          />

          {props.principalError && (
            <span className="form-error" role="alert">{props.principalError}</span>
          )}
        </label>

        <label>
          Annual interest rate (%)

          <input
            type="number"
            min="0"
            step="any"
            value={props.interestRate}
            onChange={(event) => props.onInterestRateChange(event.target.value === '' ? '' : Number(event.target.value))}
            aria-invalid={Boolean(props.interestRateError)}
          />

          {props.interestRateError && (
            <span className="form-error" role="alert">{props.interestRateError}</span>
          )}
        </label>

        <label>
          Loan term (years)

          <input type="number" min="1" step="1" value={props.termYears} onChange={(event) =>
              props.onTermYearsChange(event.target.value === '' ? '' : Number(event.target.value))
            }
            aria-invalid={Boolean(props.termYearsError)}
          />

          {props.termYearsError && (
            <span className="form-error" role="alert">{props.termYearsError}</span>
          )}
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          Calculate repayments
        </button>

        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            props.onPrincipalChange('');
            props.onInterestRateChange('');
            props.onTermYearsChange('');
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default MortgageCalculator;