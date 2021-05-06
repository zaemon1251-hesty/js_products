import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as tf from '@tensorflow/tfjs';
import { enclosingPowerOfTwo } from '@tensorflow/tfjs';

const DN_INPUT_SHAPE = [3, 3, 2];


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      tmpVal: null,
    };
  }

  getCurrentSquares() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    return [squares, history];
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      tmpVal: null,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  async comPlay() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const path = "http://localhost:8000/model/model.json";
    const model = await tf.loadLayersModel(path);
    const action = this.next_action(model,squares);
    if (calculateWinner(squares) || squares[action]) {
      return;
    }
    squares[action] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      tmpVal: null,
    });
  }

  next_action(model,squares){
    /*let nj = require('numjs');*/
    let myStone, enStone, my_pieces, en_pieces;
    myStone = this.state.xIsNext ? "X" : "O";
    enStone = myStone==="X" ? "O":"X";
    let legal_action = [...Array(9).keys()];
    legal_action = legal_action.filter(i => squares[i]===null);

    /* 現在の盤面での最善方策をとる */
    my_pieces = squares.map(sqaure => sqaure===myStone ? 1:0);
    en_pieces = squares.map(sqaure => sqaure===enStone ? 1:0);
    let [policies, _] = this.tensor_predict(model, [my_pieces, en_pieces])
    let act = maxIndex(policies)
    if (act in legal_action){
      console.log(policies);
      return act;
    }

    /* 最善方策が合法手ではないとき、次の一手終えた後の価値を最大化する */
    let values = Array(legal_action.length).fill(0);
    for (let i = 0; i< legal_action.length; i++){
      let next_squares = squares.slice()
      next_squares[legal_action[i]] = myStone;
      my_pieces = next_squares.map(sqaure => sqaure===myStone ? 1:0);
      en_pieces = squares.map(sqaure => sqaure===enStone ? 1:0);
      let x = [my_pieces, en_pieces];
      /* Need to fix */
      let [_, box] = this.tensor_predict(model,x);
      values[i] = box;
    }
    console.log('values: ' + values);
    return legal_action[maxIndex(values)];
  }

  tensor_predict(model,arr){
    const [a,b,c] = DN_INPUT_SHAPE;
    arr = tf.tensor(arr);
    let x = arr.reshape([c, a, b])
    x = tf.transpose(x, [1, 2, 0]).reshape([1, a, b, c]);
    /*x = tf.tensor4d(arr, [1,3,3,2]);*/
    let pred = model.predict(x, {batchSize: 1});
    let vector = tf.squeeze(pred[0]).dataSync();
    let value = tf.squeeze(pred[1]).dataSync()[0];
    this.setState({tmpVal:value})
    console.log(value)
    return [vector, value];
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (!(null in current.squares)){
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.comPlay()}>Alpha zeroが選ぶ</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/*function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}*/

function maxIndex(arr) {
	let index = 0
	let value = -Infinity
	for (let i = 0, l = arr.length; i < l; i++) {
		if (value < arr[i]) {
			value = arr[i]
			index = i
		}
	}
	return index;
}


class L2 {

  static className = 'L2';

  constructor(config) {
     return tf.regularizers.l1l2(config)
  }
}
tf.serialization.registerClass(L2);


function successCallback(result) {
  console.log("success" );
  return result;
}

function failureCallback(error) {
  console.log(error);
}
