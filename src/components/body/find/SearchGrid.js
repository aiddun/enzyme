import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const SearchGrid = (props) => {
  const { index } = props;

  const columnDefs = [
    {
      headerName: "Course Name",
      field: "course_name",
      filter: true,
      floatingFilter: true,
      dndSource: true
    },
    {
      headerName: "Course #",
      field: "course_nbr",
      filter: true,
      floatingFilter: true,
      width: 150,
      menuTabs: [],
    },
    {
      headerName: "Semester",
      field: "sems",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Professor",
      field: "profs",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Department",
      field: "dept",
      filter: true,
      floatingFilter: true,
    },
  ];

  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxterr", price: 72000 },
  // ];

  const onGridReady = (params) => {
    var dataSource = {
      getRows: function (params) {
        const filters = Object.entries(params.filterModel).map(([field, v]) => {
          return { field, query: v.filter };
        });

        const rows = index.search(filters);
        params.successCallback(rows, rows.length);
      },
    };

    params.api.setDatasource(dataSource);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: "800px", width: "100%" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        // rowData={[]}
        rowModelType="infinite"
        // datasource={getRows}
        onGridReady={onGridReady}
        defaultColDef={{
          resizable: true,
          filterParams: {
            debounceMs: 0,
          },
          menuTabs: [],
          floatingFilterComponentParams: { suppressFilterButton: true },
        }}
      />
    </div>
  );
};

export default SearchGrid;
