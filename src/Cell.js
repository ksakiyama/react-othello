import React from "react";
import { classes } from "./constants.js";

export default class Cell extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.x, this.props.y);
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { type } = nextProps;
    if (type !== this.props.type) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <td>
        <span onClick={this.handleClick} className={classes[this.props.type]} />
      </td>
    );
  }
}
