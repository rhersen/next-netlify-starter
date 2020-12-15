import React, { useEffect, useState } from "react";
import population from "@components/population";
import json from "./latest.json";

export default () => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let [headerObject, ...dataObjects] = json["Antal per dag region"];
    let [, ...headers] = Object.values(headerObject);

    setRows(dataObjects.map(Object.values).map(([, ...row]) => row));

    setHeaders(headers);
    setSelected(0);
  }, []);

  let yScale = 0.75;
  let yValues = Array.from({ length: 7 }).map((value, i) => (i + 1) * 100);

  let sevenDayPerMillion = (a, pop) =>
    (a.slice(-7).reduce((a, b) => a + b, 0) / 7 / pop) * 1e6;

  return (
    <>
      <div>{headers[selected]}</div>
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        {headers.map((header, i) => (
          <option value={i}>{header}</option>
        ))}
      </select>
      <div className="chart">
        <div className="y-values">
          {yValues.map((y) => (
            <div className="y-value">{y}</div>
          ))}
        </div>
        <svg viewBox="0 0 800 600">
          {yValues.map((y) => (
            <line x1="0" y1={y * yScale} x2="800" y2={y * yScale} />
          ))}

          <polyline
            fill="none"
            stroke="#c3227d"
            points={rows
              .map((row, rowIndex) =>
                row.map(() => {
                  let a = rows
                    .slice(rowIndex - 13, rowIndex + 1)
                    .map((row) => row[selected]);
                  let x = sevenDayPerMillion(a, population[selected]) || 0;
                  return (
                    (rowIndex * 800) / rows.length + "," + (600 - x * yScale)
                  );
                })
              )
              .join(" ")}
          />
        </svg>
      </div>
    </>
  );
};
