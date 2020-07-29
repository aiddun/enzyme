import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./header/NavBar";
import Body from "./body/Body";
import { getSubstrings } from "./tokenize";

const FlexSearch = require("flexsearch");
let serializedIndex = require("../data/gradeIndex.json");

const index = new FlexSearch({
  profile: "balance",
  doc: {
    id: "id",
    field: {
      course_name: {},
      sems: {},
      profs: {},
      course_nbr: {},
      dept: {tokenize: (s) => getSubstrings(s.replace(" ", ""))},
      sections: {},
    },
  },
});

index.import(serializedIndex);

// Allow for garbage collection?
serializedIndex = undefined;

function App() {

  return (
    <div className="App">
      <NavBar />
      <Body index={index} />
    </div>
  );
}

export default App;
