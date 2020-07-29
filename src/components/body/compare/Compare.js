import React from "react";
import Grapher from "./Grapher";
import CompareGrid from "./CompareGrid";
import { Grid, Typography } from "@material-ui/core";

const Compare = (props) => {
  const [selectedClass, setSelectedClass] = React.useState(null);

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

    setSelectedClass(data);
  };

  return (
    <div
      className="ag-theme-material"
      style={{ height: "50%", width: "100%" }}
      onDragOver={gridDragOver}
      onDrop={gridDrop.bind(this)}
    >
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <br />
          <Typography align="center" variant="h5">
            Save courses
          </Typography>
          <br />
          <CompareGrid selectedClass={selectedClass} />

          <Typography align="center" variant="h5">
            Graph
          </Typography>
          <Grapher selectedClass={selectedClass} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default Compare;
