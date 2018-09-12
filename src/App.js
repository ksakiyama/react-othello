import React, { Component } from "react";
import "./App.css";
import BoardLine from "./BoardLine.js";
import { calculate, searchPlacable } from "./calculate.js";

import { B, W, E } from "./constants.js";

class App extends Component {
  constructor(props) {
    super(props);
    const user = B;
    let board = [
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, W, B, E, E, E],
      [E, E, E, B, W, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E]
    ];

    board = searchPlacable(board, user);

    this.state = {
      board: board,
      turn: 0,
      user: user,
      message: "Black turn",
      cnt_black: 2,
      cnt_white: 2,
      gameover: false
    };
  }

  handleClick = (x, y) => {
    this.setState(calculate(this.state, x, y));
  };

  render() {
    return (
      <div className="App">
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
            {this.state.board.map((line, y) => {
              return (
                <BoardLine
                  key={y}
                  y={y}
                  line={line}
                  clickHandler={this.handleClick}
                />
              );
            })}
          </tbody>
        </table>
        <br />
        <h2>GAME STATUS</h2>
        <ul>
          <li>
            <b>{this.state.message}</b>
          </li>
          <li>
            # of Black Stones:
            {this.state.cnt_black}
          </li>
          <li>
            # of White Stones:
            {this.state.cnt_white}
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
