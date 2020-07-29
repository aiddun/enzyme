import React from "react";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  summer: {
    colorPrimary: "#ff9500",
  },
  spring: {
    colorPrimary: "#ff9500",
  },
  fall: {
    colorPrimary: "#ff9500",
  },
});

export default class ColonSeperatedRenderer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textFormatter = props.textFormatter;
    this.colorGenerator = props.colorGenerator;
  }

  render() {
    const { value } = this.props;

    const formattedElements = this.textFormatter
      ? this.textFormatter(value)
      : value;

    return (
      <div style={{ width: "110%", flexWrap: "wrap", display: "flex" }}>
        {formattedElements
          .map((e) => ({
            text: e,
            color: this.colorGenerator ? this.colorGenerator(e) : null,
          }))
          .map(({text, color}) => (
            <Chip
              key={text}
              label={text}
              size="small"
              style={{ marginBottom: "2px", backgroundColor: color }}
              // green: #a5d6a7
            />
          ))}
      </div>
    );
  }
}

// class ColonSeperatedRenderer extends React.PureComponent {
//     const { formatter } = props;
//     console.log(props)

//     const value = props.getValue();
//     console.log(value)
//     console.log(elements)

//     return <p></p>
// }
