import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import Grapher from "./Grapher";
import Search from "./search/Search";

const FlexSearch = require("flexsearch");
const documents = require("./data/gradeDocuments.json");
let serializedIndex = require("./data/gradeIndex.json");


const index = new FlexSearch({
  profile: "speed",
  doc: {
    id: "id",
    field: ["sem", "prof", "dept", "course_nbr", "course_name"],
  },
});

index.import(serializedIndex)
// Allow for garbage collection?
serializedIndex = undefined;

function App() {
  const [searchTerm, setSearchTerm] = React.useState(null);

  return (
    <div className="App">
      <NavBar />
      <Search {...{ index, searchTerm, setSearchTerm }} />
      <Grapher {...{ searchTerm, setSearchTerm }} />
    </div>
  );
}

export default App;
