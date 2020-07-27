var FlexSearch = require("flexsearch");
fs = require("fs");
const documents = require("./grades.json");
const util = require("util");

// Not needed - keep just in case
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

//
// let index = new FlexSearch({
//   profile: "balance",
//   doc: {
//     id: "id",
//     field: ["sems", "profs", "course_nbr", "course_name", "sections", "dept"],
//   },
// });

const getSubstrings = (s) => {
  const tokens = [];
  for (let i = 1; i < s.length; ++i) tokens.push(s.slice(0, i));

  return tokens;
};
const tokenizeCourseNum = (s) => {
  // Split into department name (w/ no spaces) and course number, and then tokenizing both
  // This assumes all course numbers start with a number
  const firstIntIndex = s.search(/\d/);
  const deptString = s.slice(0, firstIntIndex).replace(" ", "");
  const numString = s.slice(firstIntIndex);

  const result =  [...getSubstrings(deptString), ...getSubstrings(numString)];
};

console.log(`tokenize test: ${tokenizeCourseNum("C S 429H")}`);

const index = new FlexSearch({
  profile: "balance",
  doc: {
    id: "id",
    field: {
      course_name: {},
      sems: {},
      profs: {},
      course_nbr: {
        tokenize: tokenizeCourseNum,
      },
      sections: {},
    },
  },
});

const aggClasses = {};

let aggidcount = 0;

documents.forEach((doc, docid) => {
  gradeTypes.forEach((e) => {
    doc[e] = parseInt(doc[e]);
  });

  const courseEntry = aggClasses[doc.course_name];

  if (!courseEntry) {
    const { course_name, course_nbr, dept, prof, sem } = doc;
    aggClasses[doc.course_name] = {
      id: aggidcount,
      course_name,
      course_nbr: `${dept} ${course_nbr}`,
      sections: [doc],
      profs: new Set([prof]),
      sems: new Set([sem]),
    };
    ++aggidcount;
  } else {
    const { prof, sem } = doc;
    courseEntry.sections.push(doc);
    courseEntry.profs.add(prof);
    courseEntry.sems.add(sem);
  }
  delete doc.course_name;
  delete doc.course_nbr;
  delete doc.dept;
});

Object.entries(aggClasses).forEach(([k, v]) => {
  // v.sections = v.sections.join(" ; ");
  v.profs = [...v.profs].join(";");
  // v.profs = "foo"
  v.sems = [...v.sems].join(";");
});

// Convert map of (class -> doc) to array of agg classes
// Course name key already included in document
const aggDocs = Object.entries(aggClasses).map(([k, v]) => v);

// console.log()
// // // console.log(grouped)
console.log(aggDocs[0]);

index.add(aggDocs);

const foo = index.search({ field: "course_nbr", query: "CS" });
console.log(`sample query: ${foo.length}`);

// fs.writeFile(
//   "./src/data/gradeindex.json",
//   // Recursive stringify json
//   // util.inspect(index.export(), { depth: Infinity}),
//   JSON.stringify(index.export()),
//   function (err) {
//     if (err) throw err;
//     console.log("done");
//     console.log("created index with " + documents.length + " entries");
//   }
// );
