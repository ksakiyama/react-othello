import React from "react";
import Cell from "./Cell.js";

export default class BoardLine extends React.Component {
  render() {
    const y = this.props.y;
    return (
      <tr>
        <th>{y + 1}</th>
        {this.props.line.map((cellType, x) => {
          return (
            <Cell
              key={"" + y + x}
              x={x}
              y={y}
              clickHandler={this.props.clickHandler}
              type={cellType}
            />
          );
        })}
      </tr>
    );
  }
}
