const Fuse = require('fuse.js')
fs = require("fs");
const jsonData = require("./grades.json");


const options = {
  keys: ["sem", "prof", "dept", "course_nbr", "course_name"],
};

const fields = [
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

// Create the Fuse index
const index = Fuse.createIndex(options.keys, jsonData)
// initialize Fuse with the index
const fuse = new Fuse(jsonData, options, index)

// const result = fuse.search("data")
// console.log(result)

fs.writeFile('./src/data/gradeindex.json', JSON.stringify(index), function (err) {
    if (err) throw err;
    console.log('done');
    console.log('created index with ' + jsonData.length + " entries")
});
