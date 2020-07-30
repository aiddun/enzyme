import React from "react";

import { Grid } from "@material-ui/core";
import Find from "./find/Find";
import Compare from "./compare/Compare";

const Body = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { index } = props;

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={6}>
        <Find
          index={index}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Grid>
      <Grid item xs={6}>
        <Compare index={index} searchTerm={searchTerm} />
      </Grid>
    </Grid>
  );
};

export default Body;
