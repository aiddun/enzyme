import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { intersection } from "lodash";

import ColonSeperatedRenderer from "./ColonSeperatedRenderer";

const SearchGrid = (props) => {
  const { searchTerm, index } = props;

  const columnDefs = [
    {
      headerName: "Course Name",
      field: "course_name",
      filter: true,
      floatingFilter: true,
      dndSource: true,
      width: 400,
    },
    {
      headerName: "Dept",
      field: "dept",
      filter: true,
      floatingFilter: true,
      width: 100,
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
      headerName: "Professor",
      field: "profs",
      filter: true,
      floatingFilter: true,
      cellRenderer: "colonSeperatedRenderer",
      cellRendererParams: {
        // Get only lastname(s)
        textFormatter: (elements) => {
          const splitElements = elements ? elements.split(";") : [];
          return splitElements.map((fullname) => fullname.split(",")[0]);
        },
      },
      autoHeight: true,
    },
    {
      headerName: "Semester",
      field: "sems",
      filter: true,
      floatingFilter: true,
      cellRenderer: "colonSeperatedRenderer",
      cellRendererParams: {
        textFormatter: (elements) => {
          const splitElements = elements ? elements.split(";") : [];

          const seasonLetterMap = {
            Fall: "F",
            Spring: "S",
            Summer: "Su",
          };

          return splitElements.map((e) => {
            const [season, year] = e.split(" ");

            const seasonLetter = seasonLetterMap[season] || season;
            const twoDigitYear = year.substring(2, 5);

            return `${seasonLetter}${twoDigitYear}`;
          });
        },
        colorGenerator: (element) => {
          const firstNumIndex = element.search(/\d/);
          const seasonPrefix = element.substring(0, firstNumIndex);

          return (
            { S: "#a5d6a7", Su: "#ffecb3", F: "#ffa726" }[seasonPrefix] || ""
          );
        },
      },
    },
    {
      headerName: "global",
      field: "global",
      hide: true,
      filter: false,
    },
  ];

  const gridRef = React.useRef(null);

  React.useEffect(() => {
    const gridApi = gridRef.current.api;

    let filterModel = gridApi.getFilterModel();
    filterModel["global"] = {
      filterType: "text",
      type: "contains",
      filter: searchTerm,
    };

    gridApi.setFilterModel(filterModel);
  }, [searchTerm]);

  const onGridReady = (params) => {
    var dataSource = {
      getRows: (params) => {
        const { filterModel } = params;

        const filters = Object.entries(filterModel)
          .filter(([field, v]) => field !== "global")
          .map(([field, v]) => {
            return { field, query: v.filter, bool: "and" };
          });

        const globalFilterModel = filterModel["global"];

        let results = [];

        if (filters.length > 0 && globalFilterModel) {
          const fieldResults = index.search(filters);
          const globalResults = index.search(globalFilterModel.filter);

          results = intersection(fieldResults, globalResults);
        } else if (globalFilterModel) {
          results = index.search(globalFilterModel.filter);
        } else {
          results = index.search(filters);
        }

        params.successCallback(results, results.length);
      },
    };

    params.api.setDatasource(dataSource);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: "50em", width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowModelType="infinite"
        onGridReady={onGridReady}
        defaultColDef={{
          resizable: true,
          filterParams: {
            debounceMs: 0,
          },
          suppressMenu: true,
          menuTabs: [],
          floatingFilterComponentParams: { suppressFilterButton: true },
        }}
        rowHeight={55}
        frameworkComponents={{
          colonSeperatedRenderer: ColonSeperatedRenderer,
        }}
      />
    </div>
  );
};

export default SearchGrid;
