import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const GradeGrid = (props) => {

  const {index} = props
  window.foo = index

    const columnDefs = [
    { headerName: "Make", field: "make", filter: true, floatingFilter: true },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: "800px", width: "100%" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};


export default GradeGrid;