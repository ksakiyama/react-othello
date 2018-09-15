import React from "react";
import { getUserColor } from "./calculate.js";

const GameStatus = props => {
  return (
    <table className="game-status">
      <thead>
        <tr>
          <th>TURN</th>
          <th># of Black</th>
          <th># of White</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getUserColor(props.user)}</td>
          <td>{props.cntBlack}</td>
          <td>{props.cntWhite}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameStatus;
