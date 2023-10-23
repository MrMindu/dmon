"use client";

import React from "react";
// import React, { useMemo, useState } from "react";
import data from "../data/Telegrams.json";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";

function PLCTelegrams() {
  //data and fetching state
  // const [isError, setIsError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRefetching, setIsRefetching] = useState(false);
  // const [rowCount, setRowCount] = useState(0);

  // //table state
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [globalFilter, setGlobalFilter] = useState("");
  // const [sorting, setSorting] = useState([]);
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "PLC",
  //       header: "PLC",
  //     },
  //     {
  //       accessorKey: "TelegramSender",
  //       header: "Sender",
  //     },
  //     {
  //       accessorKey: "Receiver",
  //       header: "Receiver",
  //     },
  //     {
  //       accessorKey: "TUNo",
  //       header: "TU Number",
  //     },
  //     {
  //       accessorKey: "Telegram",
  //       header: "Telegram",
  //     },
  //     //column definitions...
  //   ],
  //   []
  // );

  // const table = useMaterialReactTable({
  //   columns,
  //   data,
  //   enableRowActions: true,
  //   initialState: {
  //     //showColumnFilters: true,
  //     rowsPerPage: -1,
  //     pagination: { pageSize: 500 }
  //   },
  //   muiPaginationProps: {
  //     color: "primary",
  //     shape: "rounded",
  //     showRowsPerPage: false,
  //     variant: "outlined",
  //   },
  //paginationDisplayMode: "pages",
  // });

  return (
    <div className="telegrams">
      {/* <MaterialReactTable table={table} /> */}
      {/* <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        initialState={{ showColumnFilters: true, rowsPerPage: -1 }}
        muiPaginationProps={{
          rowsPerPageOptions: ['5', '10'],
          showFirstButton: false,
          showLastButton: false,
        }}
      /> */}
      <table className="telegrams-table">
        <thead className="telegrams__thead">
          <tr>
            <th>PLC</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>TU-Number</th>
            <th>Telegram</th>
          </tr>
        </thead>
        <tbody className="telegrams__tbody">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.PLC}</td>
              <td>{item.TelegramSender}</td>
              <td>{item.Receiver}</td>
              <td>{item.TUNo}</td>
              <td>{item.Telegram}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PLCTelegrams;
