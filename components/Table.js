import React from "react";
import population from "@components/population";

export const Table = ({ headers, dates, columns, f }) => {
  return (
    <div
      className="table"
      style={{
        "grid-template-columns": `max-content repeat(${headers.length}, 1fr)`,
        "grid-template-rows": `repeat(${dates.length + 2}, 1fr)`,
      }}
    >
      <span className="date" />
      {dates.map((date) => (
        <span className="date">{date}</span>
      ))}
      {columns.map((column, colIndex) => (
        <>
          <span className="header">{headers[colIndex]}</span>
          {column.map((cell, rowIndex) => {
            let a = column.slice(rowIndex - 13, rowIndex + 1);
            let x = f(a, population[colIndex]);
            if (x === undefined) return <span> </span>;
            return <span className={color(x)}>{Math.round(x)}</span>;
          })}
          <span>{headers[colIndex]}</span>
        </>
      ))}
    </div>
  );

  function color(x) {
    for (let i = 960; i >= 60; i /= 2) if (x > i) return "color" + i;
    if (x > 20) return "color20";
    if (x > 0) return "color1";
    return "color0";
  }
};
