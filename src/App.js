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

  render() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
    const turn = this.state.turn;
    const board = this.state.board;

    let contents = new Array(8);
    let content = "";

    if (turn === 0) {
      for (let i = 0; i < 8; i++) {
        content = "";
        for (let j = 0; j < 8; j++) {
          if (board[i][j] === "") {
            content = content + "空";
          } else if (board[i][j] === "B") {
            content = content + "黒";
          } else {
            content = content + "白";
          }
        }
        contents[i] = content;
      }

      console.log("hello");
      console.log(content);

      return (
        <div className="App">
          <div>{contents[0]}</div>
          <div>{contents[1]}</div>
          <div>{contents[2]}</div>
          <div>{contents[3]}</div>
          <div>{contents[4]}</div>
          <div>{contents[5]}</div>
          <div>{contents[6]}</div>
          <div>{contents[7]}</div>
        </div>
      );
    } else {
    }
  }

  getOneLine() {
    return ["", "", "", "", "", "", "", ""];
  }
}

export default App;
