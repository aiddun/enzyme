import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Search(props) {
  // const classes = useStyles();

  const { searchTerm, setSearchTerm } = props;

  return (
    <TextField
      // classes={classes}
      fullWidth
      margin="normal"
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
      value={searchTerm}
      variant="outlined"
      label="Search"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
