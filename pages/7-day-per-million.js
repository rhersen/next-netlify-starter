import React from "react";
import json from "./latest.json";
import { Table } from "@components/Table";

export default () => {
  let [headerObject, ...dataObjects] = json["Antal per dag region"];
  let [, ...headers] = Object.values(headerObject);

  return (
    <Table
      headers={headers}
      dates={dataObjects.map((obj) => obj.A.substr(0, 10))}
      rows={dataObjects.map(Object.values).map(([, ...row]) => row)}
      f={(a, pop) => (a.slice(-7).reduce((a, b) => a + b, 0) / 7 / pop) * 1e6}
    />
  );
};