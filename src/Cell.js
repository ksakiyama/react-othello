import React from "react";
import { classes } from "./constants.js";

export default class Cell extends React.Component {
  handleClick = (x, y) => {
    this.props.clickHandler(x, y);
  };

  render() {
    return (
      <td>
        <span
          onClick={() => this.handleClick(this.props.x, this.props.y)}
          className={classes[this.props.type]}
        />
      </td>
    );
  }
}
