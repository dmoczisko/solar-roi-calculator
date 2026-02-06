import { useState } from "react";
import "./App.css";

function App() {
  const [systemCost, setSystemCost] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [electricityRate, setElectricityRate] = useState("0.13");
  const [result, setResult] = useState(null);

  const calculateROI = (e) => {
    e.preventDefault();

    const cost = parseFloat(systemCost);
    const bill = parseFloat(monthlyBill);
    const rate = parseFloat(electricityRate);

    const annualSavings = bill * 12;
    const yearsToBreakEven = cost / annualSavings;
    const twentyYearSavings = annualSavings * 20 - cost;

    setResult({
      annualSavings: annualSavings.toFixed(2),
      breakEven: yearsToBreakEven.toFixed(1),
      twentyYearROI: twentyYearSavings.toFixed(2),
    });
  };

  return (
    <div className="calculator">
      <h1>Solar ROI Calculator</h1>
      <p>Calculate your solar panel return on investment</p>

      <form onSubmit={calculateROI}>
        <div className="form-group">
          <label>Solar System Cost ($)</label>
          <input
            type="number"
            value={systemCost}
            onChange={(e) => setSystemCost(e.target.value)}
            placeholder="e.g., 25000"
            required
          />
        </div>

        <div className="form-group">
          <label>Monthly Electric Bill ($)</label>
          <input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            placeholder="e.g., 150"
            required
          />
        </div>

        <div className="form-group">
          <label>Electricity Rate ($/kWh)</label>
          <input
            type="number"
            step="0.01"
            value={electricityRate}
            onChange={(e) => setElectricityRate(e.target.value)}
            placeholder="e.g., 0.13"
          />
        </div>

        <button type="submit">Calculate ROI</button>
      </form>

      {result && (
        <div className="results">
          <h2>Results</h2>
          <div className="result-item">
            <span>Annual Savings:</span>
            <strong>${result.annualSavings}</strong>
          </div>
          <div className="result-item">
            <span>Break-even Point:</span>
            <strong>{result.breakEven} years</strong>
          </div>
          <div className="result-item">
            <span>20-Year Net Savings:</span>
            <strong>${result.twentyYearROI}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
