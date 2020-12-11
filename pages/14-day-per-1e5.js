import React, {  useEffect, useState } from "react";
import population from "@components/population";
import json from "./latest.json"

export const App = () => {
  const [headers, setHeaders] = useState([]);
  const [dates, setDates] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let [headerObject, ...dataObjects] = json["Antal per dag region"];
    let [, ...headers] = Object.values(headerObject);

    setRows(
      dataObjects
        .map(Object.values)
        .map(([, ...row]) => row)
    );

    setHeaders(headers);
    setDates(
      dataObjects.map((obj) =>
        obj.A.substr(0, 10)
      )
    );
  }, []);

  let sevenDayPerMillion = (a, pop) =>
    (a.slice(-7).reduce((a, b) => a + b, 0) / 7 / pop) * 1e6;

  let fourteenDayPer1e5 = (a, pop) =>
    (a.reduce((a, b) => a + b, 0) / pop) * 1e5;

  let sevenDayCases = (a, pop) =>
    a.slice(-7).reduce((a, b) => a + b, 0) / 7;

  let perDay = (a, pop) =>
    a.slice(-1).reduce((a, b) => a + b, 0);

  let weeklyChange = (a, pop) => {
    let prev = a.slice(0, 7).reduce((a, b) => a + b, 0);
    let curr = a.slice(-7).reduce((a, b) => a + b, 0);
    return (100 * (curr - prev)) / prev;
  };

  return (
    <div className="table">
      <span className="date" />
      {headers.map(columnHeader)}
      {rows.map((row, rowIndex) => (
        <>
          <span className="date">{dates[rowIndex]}</span>
          {row.map((value, colIndex) => {
            let a = rows
              .slice(rowIndex - 13, rowIndex + 1)
              .map((row) => row[colIndex]);
            let x = fourteenDayPer1e5(a, population[colIndex]);
            if (x === undefined) return <span> </span>;
            return <span className={color(x)}>{Math.round(x)}</span>;
          })}
        </>
      )).reverse()}
      <span className="date" />
      {headers.map(columnHeader)}
    </div>
  );

  function columnHeader(header) {
    return <span>{header}</span>;
  }

  function color(x) {
    for (let i = 960; i >= 60; i /= 2) if (x > i) return "color" + i;
    if (x > 20) return "color20";
    if (x > 0) return "color1";
    return "color0";
  }
};

export default App;
