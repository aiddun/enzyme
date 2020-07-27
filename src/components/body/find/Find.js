import React from "react";
import Search from "./Search";
import SearchGrid from "./SearchGrid";

const Find = (props) => {
  const { index, searchTerm, setSearchTerm } = props;

  return (
    <>
      <Search {...{ index, searchTerm, setSearchTerm }} />
      <SearchGrid searchTerm={searchTerm} index={index}/>
    </>
  );
};

export default Find;
