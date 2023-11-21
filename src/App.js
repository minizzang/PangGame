import './App.css';
import { useState } from 'react';
import Pang from './Pang';

const boardSize = 6;
const GameState = {
  BEFORE: 'before',
  DURING: 'during',
  END: 'end'
}
let pang = new Pang(boardSize);

function Box({idx, isBalloon, setBoard, gameOver}) {
  return (
    <div
      className={ "box" + (isBalloon ? " balloon" : "")}
      onClick={() => {
        pang.shootBalloon(idx, gameOver);
        setBoard([...pang.board]);
      }}></div>
  )
}

function App() {
  const [board, setBoard] = useState(pang.board);
  const [gameState, setGameState] = useState(GameState.DURING);

  const gameOver = () => {
    setGameState(GameState.END);
  }

  return (
    <div className="App">
      <h1>Pang Game</h1>

      <div className='container' style={{"--size": boardSize}}>
        { board.map((value, idx) => {
          return (
            <Box
              key={idx}
              idx={idx}
              isBalloon={value}
              setBoard={setBoard}
              gameOver={gameOver}/>
            ) 
          })}
      </div>
      {gameState === GameState.END
        ? <div className='over-background'>
            <h1 className='txt-over'>Game Over</h1>
          </div>
        : <></>}
    </div>
  );
}

export default App;
