import React from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, VerticalBarSeries } from 'react-vis';


function Grapher(props) {
    var { searchTerm, setSearchTerm } = props;

    if (searchTerm == null) return (
        <div style={{ textAlign: 'center' }}>
            <br />
            <br />
            <h4>Enter in a course name above</h4>
            <br />
            <br />
            <br />
            <p>This is a prototype, and is not yet a finished product</p>
            <p>Compare speed to: <a href="http://utcatalyst.org/grade-distributions">UT Catalyst</a></p>
        </div>)
        ;

    var course_name = searchTerm.course_name;
    var course_nbr = searchTerm.course_nbr;
    var course_prof = searchTerm.prof;

    // I could make a dictionary to map to all of this but I think this is easier to read
    const keys = ["a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3", "d1", "d2", "d3", "f"]
    const names = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"]
    var data = keys.map((value, index) => {
        return { x: names[index], y: searchTerm[value] }
    })

    console.log(data)


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2em' }}>
                <XYPlot height={300} width={700} xType="ordinal">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data} />
                </XYPlot>
            </div>
            <div style={{ textAlign: 'center' }}>
                <br />
                <br />
                <br />
                <p>This is a prototype, and is not yet a finished product</p>
                <p>Compare speed to: <a href="http://utcatalyst.org/grade-distributions">UT Catalyst</a></p>
            </div>)

        </div>
    );
}

export default Grapher