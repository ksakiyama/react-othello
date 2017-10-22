import React, { Component } from "react";
import "./App.css";

const B = 0;
const W = 1;
const E = 2;
const P = 3;

const dict = ["black", "white", "empty", "placable"];

class App extends Component {
  constructor(props) {
    super(props);
    const board = [
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

    return (
      <span key={key} onClick={event} className={dict[board[y][x]]}>
        {key}
      </span>
    );
  }

  clickHandler(e, key) {
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    const board = this.state.board;
    if (board[y][x] === E) {
      this.reverse(y, x)      
    }
  }

  reverse(y, x) {
    var flag = false;
    var board = this.state.board;
    const user = this.state.user;

    // cheking around cells
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        var sx = x + dx;
        var sy = y + dy;
        if (!this.onBoard(sy, sx) || !(board[sy][sx] === this.getNextUser())) {
          continue;
        }

        while(true) {
          sx = sx + dx;
          sy = sy + dy;
          if (!this.onBoard(sy, sx) || board[sy][sx] === E) {
            break;
          } else if (board[sy][sx] === this.getNextUser()) {
            continue;
          } else {
            while (true) {
              sx = sx - dx;
              sy = sy - dy;
              board[sy][sx] = user;
              if (sx === x && sy === y) {
                flag = true;
                break;
              }
            }
            break;
          }
        }
      }
    }

    if (flag) {
      this.setState({
        board: board,
        turn: this.state.turn++,
        user: this.getNextUser()
      });
    }

    return flag;
  }

  onBoard(y, x) {
    if (y < 0 || y >= 8 || x < 0 || x >= 8) {
      return false;
    }
    return true;
  }

  checkPlace(y, x) {
    const board = this.state.board;

    // already placing b/w
    if (board[y][x] !== E) {
      return false;
    }

    // ここにおけるロジック
  }

  getNextUser() {
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
