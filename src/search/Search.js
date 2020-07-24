import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ListboxComponent from "./ListboxComponent";

const useStyles = makeStyles({
  listbox: {
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

// const OPTIONS = foo().map((c) => c.course_name);

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.key}
  </ListSubheader>,
  params.children,
];

export default function VirtualizedSearch(props) {
  const classes = useStyles();

  const { index, searchTerm, setSearchTerm } = props;

  const searchIndex = (term) => {
    console.log(index.export());
    const matches = index.search({
      field: "course_name",
      query: term,
    });
    console.log(matches.length)
    return []
  };

  const filterOptions = (options, { inputValue }) => searchIndex(inputValue);

  return (
    <Autocomplete
      id="virtualizedSearch"
      style={{ width: "100%" }}
      disableListWrap
      disableOpenOnFocus
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={[]}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Search courses"
          fullWidth
        />
      )}
      renderOption={(option) => (
        <Typography noWrap>{option.course_name}</Typography>
      )}
      getOptionLabel={(option) => option.course_name}
      onChange={(event, value) => {
        setSearchTerm(value);
      }}
      value={searchTerm}
      noOptionsText={""}
    />
  );
}
