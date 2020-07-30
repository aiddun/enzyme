import React from "react";
import { Chip } from "@material-ui/core";

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
            />
          ))}
      </div>
    );
  }
}