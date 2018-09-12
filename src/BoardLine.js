import React from "react";
import { N, classes } from "./constants.js";

export default class BoardLine extends React.Component {
  handleClick = key => {
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    this.props.clickHandler(x, y);
  };

  render() {
    const y = this.props.y;
    const line = this.props.line;

    let list = [<th key={y}>{y + 1}</th>];

    for (let x = 0; x < N; x++) {
      const key = "" + y + x;
      list.push(
        <td key={key}>
          <span
            onClick={() => this.handleClick(key)}
            className={classes[line[x]]}
          />
        </td>
      );
    }
    return <tr>{list}</tr>;
  }
}
