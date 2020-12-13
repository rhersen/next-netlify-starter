import React from "react";
import population from "@components/population";

export const Table = ({ headers, dates, rows, f }) => {
  return (
    <div className="table">
      <span className="date" />
      {headers.map(columnHeader)}
      {rows
        .map((row, rowIndex) => (
          <>
            <span className="date">{dates[rowIndex]}</span>
            {row.map((value, colIndex) => {
              let a = rows
                .slice(rowIndex - 13, rowIndex + 1)
                .map((row) => row[colIndex]);
              let x = f(a, population[colIndex]);
              if (x === undefined) return <span> </span>;
              return <span className={color(x)}>{Math.round(x)}</span>;
            })}
          </>
        ))
        .reverse()}
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
