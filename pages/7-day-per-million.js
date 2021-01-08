import React from "react";
import json from "./latest.json";
import { Table } from "@components/Table";

export default () => {
  let dates = Object.keys(json.Totalt_antal_fall);
  let headers = Object.keys(json);

  return (
    <Table
      headers={headers}
      dates={dates}
      columns={headers.map((header) => dates.map((date) => json[header][date]))}
      f={(a, pop) => (a.slice(-7).reduce((a, b) => a + b, 0) / 7 / pop) * 1e6}
    />
  );
};
