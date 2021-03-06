import React from "react";
import { Table } from "@components/Table";

export default ({ json }) => {
  let dates = Object.keys(json.Totalt_antal_fall);
  let headers = Object.keys(json);

  return (
    <Table
      headers={headers}
      dates={dates}
      columns={headers.map((header) => dates.map((date) => json[header][date]))}
      f={(a, pop) => (a.reduce((a, b) => a + b, 0) / pop) * 1e5}
    />
  );
};

export const getServerSideProps = async () => ({
  props: {
    json: await (await fetch(`http://linode.hersen.name:3000/cases`)).json(),
  },
});
