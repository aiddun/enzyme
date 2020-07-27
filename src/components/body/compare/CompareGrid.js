import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const SearchGrid = (props) => {
  const { index } = props;

  const gridRef = React.useRef();

  const columnDefs = [
    {
      headerName: "Course Name",
      field: "course_name",
      filter: true,
      floatingFilter: true,
      dndSource: true,
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

  const gridDragOver = (event) => {
    const dragSupported = event.dataTransfer.types.length;

    if (dragSupported) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  };

  const gridDrop = (event) => {
    event.preventDefault();
    const userAgent = window.navigator.userAgent;
    const isIE = userAgent.indexOf("Trident/") >= 0;
    const jsonData = event.dataTransfer.getData(
      isIE ? "text" : "application/json"
    );
    const data = JSON.parse(jsonData);

    // if data missing or data has no it, do nothing
    if (!data || data.id == null) {
      return;
    }

    console.log(gridRef);
    const gridApi = gridRef.current.api;

    // do nothing if row is already in the grid, otherwise we would have duplicates
    const rowAlreadyInGrid = !!gridApi.getRowNode(data.id);
    if (rowAlreadyInGrid) {
      console.log("not adding row to avoid duplicates in the grid");
      return;
    }

    const transaction = {
      add: [data],
    };
    gridApi.applyTransaction(transaction);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: "800px", width: "100%" }}
      onDragOver={gridDragOver}
      onDrop={gridDrop.bind(this)}
    >
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={[]}
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
