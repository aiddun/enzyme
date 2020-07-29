import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const gradeTypes = {
  a2: "A",
  a3: "A-",
  b1: "B+",
  b2: "B",
  b3: "B-",
  c1: "C+",
  c2: "C",
  c3: "C-",
  d1: "D+",
  d2: "D",
  d3: "D-",
  f: "F",
};

const columnDefs = [
  {
    headerName: "Professor",
    field: "prof",
    filter: true,
    floatingFilter: true,
  },
  {
    headerName: "Semester",
    field: "sem",
    filter: true,
    floatingFilter: true,
    width: 130,
  },
  // Turn each grade type above into a column
  ...Object.entries(gradeTypes).map(([dataLetterGrade, displayLetterGrade]) => {
    return {
      headerName: displayLetterGrade,
      field: dataLetterGrade,
      filter: false,
      width: 75,
    };
  }),
];

const SearchGrid = (props) => {
  const { selectedClass } = props;

  const gridRef = React.useRef();

  React.useEffect(() => {
    if (selectedClass) {
      const gridApi = gridRef.current.api;
      console.log(selectedClass);
      gridApi.setRowData(selectedClass.sections);
    }
  }, [selectedClass]);

  return (
    <AgGridReact
      ref={gridRef}
      columnDefs={columnDefs}
      rowData={[]}
      defaultColDef={{
        resizable: true,
        filterParams: {
          debounceMs: 0,
        },
        suppressMenu: true,
        menuTabs: [],
        floatingFilterComponentParams: { suppressFilterButton: true },
      }}
      rowSelection="single"
      onRowSelected={(e) => console.log(e)}
    />
  );
};

export default SearchGrid;
