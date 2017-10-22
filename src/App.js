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

    this.searchReversable(this.state.user);
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
    console.log("clicked");
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    const board = this.state.board;

    // if (board[y][x] === P) {
    if (this.reverse(y, x)) {
      console.log("debug");
      this.searchReversable(); // なぜかreverseで更新されたuserが変更されていない
    }
    // }

    console.log("clicked end");
  }

  searchReversable(user) {
    var board = this.state.board;
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        if (board[y][x] === B || board[y][x] === W) {
          continue;
        }

        board[y][x] = E;

        for (var dy = -1; dy <= 1; dy++) {
          for (var dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) {
              continue;
            }

            var sx = x + dx;
            var sy = y + dy;
            if (!this.onBoard(sy, sx) || !(board[sy][sx] === 1 - user)) {
              continue;
            }

            while (true) {
              sx = sx + dx;
              sy = sy + dy;
              if (
                !this.onBoard(sy, sx) ||
                board[sy][sx] === E ||
                board[sy][sx] === P
              ) {
                break;
              } else if (board[sy][sx] === 1 - user) {
                continue;
              } else {
                board[y][x] = P;
                break;
              }
            }
          }
        }
      }
    }

    this.setState({
      board: board
    });
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

        while (true) {
          sx = sx + dx;
          sy = sy + dy;
          if (
            !this.onBoard(sy, sx) ||
            board[sy][sx] === P ||
            board[sy][sx] === E
          ) {
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
      // refresh
      // for (var iy = 0; iy < 8; iy++) {
      //   for (var ix = 0; ix < 8; ix++) {
      //     if (board[iy][ix] === P) {
      //       board[iy][ix] = E;
      //     }
      //   }
      // }
      this.setState({
        board: board,
        turn: this.state.turn++,
        user: 1 - this.state.user
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
    // debug
    const user = this.state.user;
    const turn = this.state.turn;
    if (user === B) {
      console.log("user:black");
    } else {
      console.log("user:white");
    }
    console.log("turn:" + turn);

    let list = [];
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        list.push(this.getCurrentBoardArray(y, x));
      }
      const key = "br" + y;
      list.push(<br key={key} />);
    }

    return <div className="App">{list}</div>;
  }
}

export default App;
