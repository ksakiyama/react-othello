import React, { Component } from "react";
import "./App.css";
import GameBoard from "./GameBoard.js";
import GameStatus from "./GameStatus.js";
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
      message: "",
      cntBlack: 2,
      cntWhite: 2,
      gameover: false
    };
  }

  handleClick = (x, y) => {
    this.setState(calculate(this.state, x, y));
  };

  render() {
    return (
      <div className="App">
        <GameBoard board={this.state.board} clickHandler={this.handleClick} />
        <br />
        <h2>GAME STATUS</h2>
        <h3>{this.state.message}</h3>
        <GameStatus
          user={this.state.user}
          cntBlack={this.state.cntBlack}
          cntWhite={this.state.cntWhite}
        />
      </div>
    );
  }
}

export default App;
