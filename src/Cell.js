import React from "react";
import { classes } from "./constants.js";

class Cell extends React.PureComponent {
  handleClick = () => {
    this.props.clickHandler(this.props.x, this.props.y);
  };

  render() {
    return (
      <td>
        <span onClick={this.handleClick} className={classes[this.props.type]} />
      </td>
    );
  }
}

export default Cell;
