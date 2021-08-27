import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return  (
//             //<button className='Square' onClick={function() {console.log('click')}}>
//             <button 
//                 className='Square' 
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button
            className='Square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function checkWin(squares) {
    const win_lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i=0; i < win_lines.length; i++) {
        const [a, b, c] = win_lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            X_isNext: true,
        };
    }
    handleClick(i) {
        const temp_squares = this.state.squares.slice();
        if (checkWin(temp_squares) || temp_squares[i]) {
            return;
        }
        temp_squares[i] = this.state.X_isNext ? 'X': 'O';
        this.setState({
            squares: temp_squares,
            X_isNext: !this.state.X_isNext,
        });

    }
    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }
    render() {
        const winner = checkWin(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next Player: ' + (this.state.X_isNext ? 'X': 'O');
        }
        return (
            <div>
                <div className='status'>{status}</div>
                <div className='row_1'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='row_2'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='row_3'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game_board'>
                    <Board />
                </div>
                <div className='game_info'>
                    <div>{/* status */}</div>
                    <ol>{/* ToDo */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  