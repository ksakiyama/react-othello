import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    let board = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "W", "B", "", "", ""],
      ["", "", "", "B", "W", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""]
    ];
    this.state = {
      board: board,
      turn: 0
    };
  }

  getCurrentBoardArray(y, x) {
    const board = this.state.board;
    // const key = y * 8 + x;
    const key = "" + y + x;
    if (board[y][x] === "B") {
      return (
        <span key={key} onClick={e => this.clickHandler(e)} className="black">{key}
        </span>
      );
    } else if (board[y][x] === "W") {
      return (
        <span key={key} className="white">{key}
        </span>
      );
    } else {
      return (
        <span key={key} className="board">{key}
        </span>
      );
    }
  }

  clickHandler(e) {
    // console.log(e)
    console.log(e.currentTarget)
    const val = "" + e.currentTarget

    console.log(val)
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

    return <div className="App">
          {list}
      </div>;
  }
}

export default App;
