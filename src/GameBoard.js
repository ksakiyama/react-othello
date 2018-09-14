import React from "react";
import BoardLine from "./BoardLine.js";

const GameBoard = props => {
  return (
    <table className="game-board">
      <thead>
        <tr>
          <th />
          <th>a</th>
          <th>b</th>
          <th>c</th>
          <th>d</th>
          <th>e</th>
          <th>f</th>
          <th>g</th>
          <th>h</th>
        </tr>
      </thead>
      <tbody>
        {props.board.map((line, y) => {
          return (
            <BoardLine
              key={y}
              y={y}
              line={line}
              clickHandler={props.clickHandler}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default GameBoard;
