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
      rows={dates.map((date) => headers.map((header) => json[header][date]))}
      f={(a, pop) => (a.reduce((a, b) => a + b, 0) / pop) * 1e5}
    />
  );
};
