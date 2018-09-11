const B = 0;
const W = 1;
const E = 2;
const P = 3;

const N = 8;

export function calculate(obj, x, y) {
  if (obj.gameover) {
    return obj;
  }

  let board = obj.board;

  if (board[y][x] !== P) {
    return obj;
  }

  let user = obj.user;

  // reverse
  board = reverse(board, user, y, x);

  // update state
  user = 1 - user;
  board = searchPlacable(board, user);

  // check status
  let [cnt_black, cnt_white, cnt_placeble] = countStone(board);

  let gameover = false;
  let skip = false;
  if (cnt_black + cnt_white === N * N) {
    gameover = true;
  } else if (cnt_black === 0 || cnt_white === 0) {
    gameover = true;
  } else if (cnt_placeble === 0) {
    skip = true;
  }

  let message = "";
  if (gameover) {
    if (cnt_black > cnt_white) {
      message = "Black won!";
    } else if (cnt_black < cnt_white) {
      message = "White won!";
    } else {
      message = "Draw";
    }
  } else {
    if (skip) {
      user = 1 - user;
      board = searchPlacable(board, user); // check again
    }
    if (user === B) {
      message = "Black turn";
    } else {
      message = "White turn";
    }
    if (skip) {
      message = "Skipped. " + message + " again";
    }
  }

  return {
    board: board,
    user: user,
    turn: obj.turn + 1,
    message,
    cnt_black,
    cnt_white,
    gameover
  };
}

export function searchPlacable(board, user) {
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
          if (!isOnBoard(ny, nx) || !(board[ny][nx] === 1 - user)) {
            continue;
          }

          while (true) {
            nx = nx + dx;
            ny = ny + dy;
            if (
              !isOnBoard(ny, nx) ||
              board[ny][nx] === E ||
              board[ny][nx] === P
            ) {
              break;
            } else if (board[ny][nx] === 1 - user) {
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

function isOnBoard(y, x) {
  if (y < 0 || y >= N || x < 0 || x >= N) {
    return false;
  }
  return true;
}

function reverse(board, user, y, x) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      let nx = x + dx;
      let ny = y + dy;
      if (!isOnBoard(ny, nx) || !(board[ny][nx] === 1 - user)) {
        continue;
      }

      let step = 2;
      let flipable = false;
      let flipable_points = [[x, y], [nx, ny]];
      while (true) {
        nx = x + dx * step;
        ny = y + dy * step;

        if (
          !isOnBoard(ny, nx) ||
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

function countStone(board) {
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
