import React from "react";
import Search from "./Search";
import SearchGrid from "./SearchGrid";
import { Grid } from "@material-ui/core";

const Find = (props) => {
  const { index, searchTerm, setSearchTerm } = props;

  return (
    <div>
      <br />
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SearchGrid searchTerm={searchTerm} index={index} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default Find;
