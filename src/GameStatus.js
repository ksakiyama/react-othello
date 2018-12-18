import React from "react";
import { getUserColor } from "./calculate.js";

const GameStatus = React.memo(props => {
  return (
    <table className="game-status">
      <thead>
        <tr>
          <th>TURN</th>
          <th># of BLACK</th>
          <th># of WHITE</th>
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
});

export default GameStatus;
