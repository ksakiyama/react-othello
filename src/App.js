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

    // const curBoard = [].concat(this.state.board);
    const curBoard = this.state.board;
    var user = this.state.user;
    var turn = this.state.turn;

    // reverse
    var nextBoard = this.reverse(curBoard, user, y, x);
    console.log(curBoard);
    console.log(nextBoard);

    // if changed
    // if (curBoard.toString() !== nextBoard.toString()) {
    //   console.log("changed")
    //   user = 1 - user;
    //   turn = turn + 1;
    //   nextBoard = this.searchReversable(nextBoard, user);
    // }

    // なぜか盤面を比較しても更新されてないっぽい
    // JavaScriptの配列と関数の引数のコピー的な問題？
    // →[].concat()使っても解決されなかった

    // for (var dy = 0; dy < 8; dy++) {
    //   for (var dx = 0; dx < 8; dx++) {
    //     if (nextBoard[dy][dx] !== curBoard[dy][dx]) {
    //       console.log("changed")
    //       user = 1 - user;
    //       turn = turn + 1;
    //       nextBoard = this.searchReversable(nextBoard, user);
    //     }
    //   }
    // }

    // これを正しく実行したいが、上手くいかないなぁ
    //
    user = 1 - user;
    turn = turn + 1;
    nextBoard = this.searchReversable(nextBoard, user);

    this.setState({
      board: nextBoard,
      user: user,
      turn: turn
    });
  }

  // componentWillUpdate() {
  //   console.log("componentWillUpdate called");
  // }

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
    var flag = false;
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
                flag = true;
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
