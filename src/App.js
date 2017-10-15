import React, { Component } from "react";
import "./App.css";

const E = 9;
const B = 0;
const W = 1;

class App extends Component {
  constructor(props) {
    super(props);
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
    this.state = {
      board: board,
      turn: 0,
      user: B // first player
    };
  }

  getCurrentBoardArray(y, x) {
    const board = this.state.board;
    const key = "" + y + x;
    const event = e => this.clickHandler(e, key);
    if (board[y][x] === B) {
      return (
        <span key={key} onClick={event} className="black">
          {key}
        </span>
      );
    } else if (board[y][x] === W) {
      return (
        <span key={key} onClick={event} className="white">
          {key}
        </span>
      );
    } else {
      return (
        <span key={key} onClick={event} className="board">
          {key}
        </span>
      );
    }
  }

  clickHandler(e, key) {
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    const user = this.state.user;

    let board = this.state.board;

    if (!this.checkPlace(y, x)) {
      // TODO
    }

    // placing
    board[y][x] = user;

    // update
    this.setState({
      board: board,
      turn: this.state.turn++,
      user: this.changeUser()
    });

    // debug
    console.log(key);
    console.log(y);
    console.log(x);
  }

  getPlacableCell() {
    const board = this.state.board;
    const user = this.state.user;
  }

  checkPlacable(y, x) {
    const board = this.state.board;
    const user = this.state.user;
  }

  checkPlace(y, x) {
    const board = this.state.board;

    // already placing b/w
    if (board[y][x] !== E) {
      return false;
    }

    // ここにおけるロジック
  }

  changeUser() {
    return 1 - this.state.user;
  }

  render() {
    let list = [];
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        list.push(this.getCurrentBoardArray(y, x));
      }
      const key = "br" + y;
      list.push(<br key={key} />);
    }

    // debug
    console.log("called render()");

    return <div className="App">{list}</div>;
  }
}

export default App;
