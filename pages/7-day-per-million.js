import React from "react";
import json from "./latest.json";
import { Table } from "@components/Table";

let sevenDayPerMillion = (a, pop) =>
  (a.slice(-7).reduce((a, b) => a + b, 0) / 7 / pop) * 1e6;

let fourteenDayPer1e5 = (a, pop) => (a.reduce((a, b) => a + b, 0) / pop) * 1e5;

let sevenDayCases = (a, pop) => a.slice(-7).reduce((a, b) => a + b, 0) / 7;

let perDay = (a, pop) => a.slice(-1).reduce((a, b) => a + b, 0);

let weeklyChange = (a, pop) => {
  let prev = a.slice(0, 7).reduce((a, b) => a + b, 0);
  let curr = a.slice(-7).reduce((a, b) => a + b, 0);
  return (100 * (curr - prev)) / prev;
};

export default () => {
  let [headerObject, ...dataObjects] = json["Antal per dag region"];
  let [, ...headers] = Object.values(headerObject);

  return (
    <Table
      headers={headers}
      dates={dataObjects.map((obj) => obj.A.substr(0, 10))}
      rows={dataObjects.map(Object.values).map(([, ...row]) => row)}
      f={sevenDayPerMillion}
    />
  );
};
