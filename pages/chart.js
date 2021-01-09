import React, { useEffect, useState } from "react";
import population from "@components/population";

export default ({ json }) => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let dates = Object.keys(json.Totalt_antal_fall);
    let headers = Object.keys(json);

    setRows(dates.map((date) => headers.map((header) => json[header][date])));

    setHeaders(headers);
    setSelected(0);
  }, []);

  let yMax = 1000;
  let yScale = 600 / yMax;
  let yValues = Array.from({ length: yMax / 100 - 1 }).map(
    (value, i) => (i + 1) * 100
  );

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

export const getServerSideProps = async () => ({
  props: {
    json: await (await fetch(`http://linode.hersen.name:3000/cases`)).json(),
  },
});
