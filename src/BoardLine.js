import React from "react";

const B = 0;
const W = 1;
const E = 2;
const P = 3;

const N = 8;

const dict = ["black", "white", "empty", "placable"];

export default class BoardLine extends React.Component {
  handleClick = key => {
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    this.props.clickHandler(x, y);
  }

  render() {
    const y = this.props.y;
    const line = this.props.line;

    let list = [<th key={y}>{y + 1}</th>];

    for (let x = 0; x < N; x++) {
      const key = "" + y + x;
      list.push(
        <td key={key}>
          <span
            key={key}
            onClick={() => this.handleClick(key)}
            className={dict[line[x]]}
          />
        </td>
      );
    }
    return <tr>{list}</tr>;
  }
}
