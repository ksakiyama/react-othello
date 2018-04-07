import React, { Component } from 'react';
import './App.css';

const B = 0;
const W = 1;
const E = 2;
const P = 3;

const N = 8;

const dict = ['black', 'white', 'empty', 'placable'];

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

    board = this.searchPlacable(board, user);
    console.log(board);

    this.state = {
      board: board,
      turn: 0,
      user: user,
      message: 'Brack turn',
      cnt_black: 2,
      cnt_white: 2,
      gameover: false
    };
  }

  clickHandler(e, key) {
    const y = Number(key.charAt(0));
    const x = Number(key.charAt(1));
    let board = this.state.board;

    if (board[y][x] !== P) {
      return;
    }

    let user = this.state.user;

    // reverse
    board = this.reverse(board, user, y, x);

    // update state
    user = 1 - user;
    board = this.searchPlacable(board, user);

    // check status
    let [cnt_black, cnt_white, cnt_placeble] = this.countStone(board);

    let gameover = false;
    let skip = false;
    if (cnt_black + cnt_white === N * N) {
      gameover = true;
    } else if (cnt_black === 0 || cnt_white === 0) {
      gameover = true;
    } else if (cnt_placeble === 0) {
      skip = true;
    }

    let message = '';
    if (gameover) {
      if (cnt_black > cnt_white) {
        message = 'Black won!';
      } else if (cnt_black < cnt_white) {
        message = 'White won!';
      } else {
        message = 'Draw';
      }
      return;
    }

    if (skip) {
      user = user - 1;
      board = this.searchPlacable(board, user); // check again
    }

    if (user === B) {
      message = 'Black turn';
    } else {
      message = 'White turn';
    }

    if (skip) {
      message = 'Skipped. ' + message + ' again';
    }

    this.setState({
      board: board,
      user: user,
      turn: this.state.turn + 1,
      message,
      cnt_black,
      cnt_white
    });
  }

  countStone(board) {
    let b = 0;
    let w = 0;
    let p = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (board[y][x] === B) {
          b++;
        } else if (board[y][x] === W) {
          w++;
        } else if (board[y][x] === P) {
          p++;
        }
      }
    }
    return [b, w, p];
  }

  searchPlacable(board, user) {
    let cnt_placeble = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (board[y][x] === B || board[y][x] === W) {
          continue;
        }

        board[y][x] = E;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) {
              continue;
            }

            let nx = x + dx;
            let ny = y + dy;
            if (!this.onBoard(ny, nx) || !(board[ny][nx] === 1 - user)) {
              continue;
            }

            while (true) {
              nx = nx + dx;
              ny = ny + dy;
              if (
                !this.onBoard(ny, nx) ||
                board[ny][nx] === E ||
                board[ny][nx] === P
              ) {
                break;
              } else if (board[ny][nx] === 1 - user) {
                continue;
              } else {
                board[y][x] = P;
                cnt_placeble += 1;
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
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        let nx = x + dx;
        let ny = y + dy;
        if (!this.onBoard(ny, nx) || !(board[ny][nx] === 1 - user)) {
          continue;
        }

        let step = 2;
        let flipable = false;
        let flipable_points = [[x, y], [nx, ny]];
        while (true) {
          nx = x + dx * step;
          ny = y + dy * step;

          if (
            !this.onBoard(ny, nx) ||
            board[ny][nx] === P ||
            board[ny][nx] === E
          ) {
            break;
          } else if (board[ny][nx] === user) {
            flipable = true;
            break;
          }
          flipable_points.push([nx, ny]);
          step += 1;
        }

        if (flipable) {
          for (const p of flipable_points) {
            board[p[1]][p[0]] = user;
          }
        }
      }
    }
    return board;
  }

  onBoard(y, x) {
    if (y < 0 || y >= N || x < 0 || x >= N) {
      return false;
    }
    return true;
  }

  renderBoard() {
    return (
      <table className="game-board">
        {this.renderLine(0)}
        {this.renderLine(1)}
        {this.renderLine(2)}
        {this.renderLine(3)}
        {this.renderLine(4)}
        {this.renderLine(5)}
        {this.renderLine(6)}
        {this.renderLine(7)}
      </table>
    );
  }

  renderLine(y) {
    let list = [];
    const board = this.state.board;
    for (let x = 0; x < N; x++) {
      const key = '' + y + x;
      const event = e => this.clickHandler(e, key);
      list.push(
        <td key={key}>
          <span key={key} onClick={event} className={dict[board[y][x]]} />
        </td>
      );
    }
    return (
      <tbody>
        <tr>{list}</tr>
      </tbody>
    );
  }

  renderExplanation() {
    return (
      <ul>
        <li>
          GAME STATUS
          <ul>
            <li>{this.state.message}</li>
            <li>Black:{this.state.cnt_black}</li>
            <li>White:{this.state.cnt_white}</li>
          </ul>
        </li>
        <li>You can place stone on red square point.</li>
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderBoard()}
        <br />
        {this.renderExplanation()}
      </div>
    );
  }
}

export default App;
