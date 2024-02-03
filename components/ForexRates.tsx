"use client";

import { IProps } from "@/utils/interface/ForexRatesInterFace";
import { RatesType } from "@/utils/types/type";
import { useState, useEffect, FC } from "react";

const ForexRates: FC<IProps> = ({
  base = "USD",
  currencies = "EUR,INR,JPY",
}) => {
  const [rates, setRates] = useState<RatesType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [baseCurrency, setBaseCurrency] = useState<string>(base);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      `https://api.forexrateapi.com/v1/latest?api_key=dd02fd8268bcb624b6fcca71e9e3c7d6&base=${baseCurrency}&currencies=${currencies}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRates(data.rates);
          setBaseCurrency(data.base);
          setTimestamp(data.timestamp);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [baseCurrency, currencies]);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-4xl font-bold text-center">Forex Rates</h1>
      {error && <p className="text-center text-red-600">{error}</p>}
      {rates && (
        <div>
          <p>Base: {baseCurrency}</p>
          <p>Timestamp: {timestamp}</p>
          <table className="mx-auto mt-4 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Currency</th>
                <th className="px-4 py-2 border">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rates).map((key) => (
                <tr key={key}>
                  <td className="px-4 py-2 border">{key}</td>
                  <td className="px-4 py-2 border">{Math.round(rates[key])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ForexRates;
