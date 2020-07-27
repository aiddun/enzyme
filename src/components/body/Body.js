import React from "react";

import { Grid } from "@material-ui/core";
import Grapher from "./compare/Grapher";
import Find from "./find/Find"
import CompareGrid from "./compare/CompareGrid"

const Body = (props) => {
  const { index, searchTerm, setSearchTerm } = props;
  const [compareCourses, setCompareCourses] = React.useState([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Find {...{ index, searchTerm, setSearchTerm }}/>
      </Grid>
      <Grid item xs={6}>
        <CompareGrid/>
        <Grapher {...{ searchTerm, setSearchTerm }} />
      </Grid>
    </Grid>
  );
};

export default Body;
