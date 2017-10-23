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
    const user = B;
    var board = [
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, W, B, E, E, E],
      [E, E, E, B, W, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E],
      [E, E, E, E, E, E, E, E]
    ];

    board = this.searchReversable(board, user);
    console.log(board);

    this.state = {
      board: board,
      turn: 0,
      user: user // first player
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
    var board = this.state.board;

    if (board[y][x] !== P) {
      return;
    }

    var user = this.state.user;

    // reverse
    var board = this.reverse(board, user, y, x);

    // update state
    user = 1 - user;
    board = this.searchReversable(board, user);

    this.setState({
      board: board,
      user: user,
      turn: this.state.turn + 1
    });
  }

  searchReversable(board, user) {
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

    return board;
  }

  reverse(board, user, y, x) {
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
            board[sy][sx] === P ||
            board[sy][sx] === E
          ) {
            break;
          } else if (board[sy][sx] === 1 - user) {
            continue;
          } else {
            while (true) {
              sx = sx - dx;
              sy = sy - dy;
              board[sy][sx] = user;
              if (sx === x && sy === y) {
                break;
              }
            }
            break;
          }
        }
      }
    }
    return board;
  }

  onBoard(y, x) {
    if (y < 0 || y >= 8 || x < 0 || x >= 8) {
      return false;
    }
    return true;
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

    return <div className="App">{list}</div>;
  }
}

export default App;
