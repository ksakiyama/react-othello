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
    const user = this.state.user;

    let board = this.state.board;

    // if (!this.checkPlace(y, x)) {
    //   // TODO

    // }

    // placing
    board[y][x] = user;

    // update
    this.setState({
      board: board,
      turn: this.state.turn++,
      user: this.getNextUser()
    });
  }

  reverse(y, x) {
    var board = this.state.board;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx === 0) {
          continue;
        }

        var ry = y + dy;
        var rx = x + dx;
        if (!board[ry][rx] === this.getNextUser()) {
          continue;
        }

        ry++;
        rx++;
        while(this.checkBorder(ry, rx)) {
          // 相手のセルの場合
          if (board[ry][rx] === this.getNextUser()) {
            ry++
            rx++
            continue
          } else if(board[ry][rx] === this.state.user) {
            // 自分と同じ場合は
          }
        }
      }
    }
  }

  checkBorder(y, x) {
    if (y < 0 || y >= 8 || x < 0 || x >= 8) {
      return false;
    }
    return true;
  }

  // getPlacableCell() {
  //   const board = this.state.board;
  //   const user = this.state.user;
  //   let list = [];

  //   for (var y = 0; y < 8; y++) {
  //     for (var x = 0; x < 8; x++) {

  //       for (var dy = -1; dy <= 1; dy++) {
  //         for (var dx = -1; dx <= 1; dx++) {
  //           if (dx === 0 && dy ===0) {
  //             continue
  //           }

  //           var ty = y + dy;
  //           var tx = x + dx;
  //           while(ty < 0 || ty >= 8 || tx < 0 || tx >= 8) {
  //             if (board[ty][tx] == this.getNextUser())
  //             ty += dy;
  //             tx += dx;
  //             break
  //           }
  //         }
  //       }

  //     }
  //   }
  // }

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
