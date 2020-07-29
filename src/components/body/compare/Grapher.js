import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
} from "react-vis";

//   if (searchTerm == null)
//     return (
//       <div style={{ textAlign: "center" }}>
//         <br />
//         <br />
//         <h4>Enter in a course name above</h4>
//         <br />
//         <br />
//         <br />
//         <p>This is a prototype, and is not yet a finished product</p>
//         <p>
//           Compare speed to:{" "}
//           <a href="http://utcatalyst.org/grade-distributions">UT Catalyst</a>
//         </p>
//       </div>
//     );

// I could make a dictionary to map to all of this but I think this is easier to read
const gradeTypes = {
  a2: "A",
  a3: "A-",
  b1: "B+",
  b2: "B",
  b3: "B-",
  c1: "C+",
  c2: "C",
  c3: "C-",
  d1: "D+",
  d2: "D",
  d3: "D-",
  f: "F",
};

const Grapher = (props) => {
  const { selectedClass } = props;

  const [graphData, setGraphData] = React.useState([]);

  const processSections = (sections) => {
    // These functional things are getting out of control
    console.log(sections);
    const newData = Object.entries(gradeTypes).map(
      ([dataLetterGrade, displayLetterGrade]) => {
        return {
          // sum over all grade counts per key
          // ex: a2: 500
          x: displayLetterGrade,
          y: sections.reduce(
            (accumulator, section) =>
              accumulator + (section[dataLetterGrade] || 0),
            0
          ),
        };
      }
    );

    return newData;
  };

  React.useEffect(() => {
    if (selectedClass) {
      const {
        course_name,
        course_nbr,
        course_dept,
        course_prof,
        sections,
      } = selectedClass;

      console.log(selectedClass);

      setGraphData({
        course_name,
        course_nbr,
        course_dept,
        course_prof,
        sectionData: processSections(sections),
      });
    }
  }, [selectedClass]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2em",
        }}
      >
        <XYPlot height={250} width={800} xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={graphData.sectionData} />
        </XYPlot>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>
          {graphData.course_dept} {graphData.course_nbr}:{" "}
          {graphData.course_name}
        </h4>
        <p>{graphData.course_prof}</p>
        <br />
        <br />
        <br />
        <p>This is a prototype, and is not yet a finished product</p>
        <p>
          Compare speed to:{" "}
          <a href="http://utcatalyst.org/grade-distributions">UT Catalyst</a>
        </p>
      </div>
    </div>
  );
};

export default Grapher;
