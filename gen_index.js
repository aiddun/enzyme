var elasticlunr = require('elasticlunr');
fs = require('fs');
const jsonData = require('./grades.json');

var searchfields = ["sem","prof","dept","course_nbr","course_name"];
var intfields   = ["a1","a2","a3","b1","b2","b3","c1","c2","c3","d1","d2","d3","f"];

let index = elasticlunr(function () {
    this.setRef('id');    

    searchfields.forEach((f) => this.addField(f))

    this.saveDocument(true);
});


for (let i = 0; i < jsonData.length; i++) {
    let classDocument = jsonData[i];
    // For each int field, parse it as an int
    for (let j = 0; j < intfields.length; j++) {
        classDocument[intfields[j]] = parseInt(classDocument[intfields[j]])
    }

    let doc = {"id": parseInt(i), ...classDocument};
    index.addDoc(doc);
}    



const result = index.search("314", {bool: "AND", expand: true})

console.log(result);

// console.log("trher");

// console.log(index.documentStore.toJSON())

// fs.writeFile('./src/data/index.json', JSON.stringify(index), function (err) {
//     if (err) throw err;
//     console.log('done');
//     console.log('created index with ' + jsonData.length + " entries")
// });