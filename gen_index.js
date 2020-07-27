var FlexSearch = require("flexsearch");
fs = require("fs");
const documents = require("./grades.json");
const { exit } = require("process");

const gradeTypes = [
  "a1",
  "a2",
  "a3",
  "b1",
  "b2",
  "b3",
  "c1",
  "c2",
  "c3",
  "d1",
  "d2",
  "d3",
  "f",
];

let index = new FlexSearch({
  profile: "balance",
  doc: {
    id: "id",
    // field: ["course_name"],
    field: ["sem", "prof", "dept", "course_nbr", "course_name"],
  },
});

documents.forEach((doc, i) => {
  doc["id"] = i;
  gradeTypes.forEach((e) => {
    doc[e] = parseInt(doc[e]);
  });
});

index.add(documents);

const foo = index.search({ field: "course_name", query: "data" });
console.log(foo);

fs.writeFile(
  "./src/data/gradeindex.json",
  JSON.stringify(index.export()),
  function (err) {
    if (err) throw err;
    console.log("done");
    console.log("created index with " + documents.length + " entries");
  }
);
