import './App.css';
import { useState } from 'react';
import Pang from './Pang';

const GameState = {
  BEFORE: 'before',
  DURING: 'during',
  END: 'end'
}
const initialBoardSize = 6;
let pang = new Pang(initialBoardSize);

function Box({idx, isBalloon, boxClickEvent}) {
  return (
    <div
      className={ "box" + (isBalloon ? " balloon" : "")}
      onClick={() => boxClickEvent(idx)}></div>
  )
}

function App() {
  const [boardSize, setBoardSize] = useState(initialBoardSize);
  const [board, setBoard] = useState(pang.board);
  const [gameState, setGameState] = useState(GameState.BEFORE);

  // 3 <= boardSize <= 15 is valid
  const changeBoardSize = (value) => {
    let targetSize = boardSize+value;
    if (targetSize < 3 || targetSize > 15) {
      return;
    } else {
      setBoardSize(targetSize);
      pang.boardSize = targetSize;
      setBoard([...pang.board]);
    }
  }

  const boxClickEvent = (idx) => {
    if (gameState === GameState.DURING) {
      pang.shootBalloon(idx, gameOver);
      setBoard([...pang.board]);
    }
  }

  const gameStart = () => {
    setGameState(GameState.DURING);
    pang.createRandomBoard();
    setBoard([...pang.board]);
  }

  const gameOver = () => {
    setGameState(GameState.END);
  }

  return (
    <div className="App">
      <h1>Pang Game</h1>

      {gameState === GameState.BEFORE ? 
        <div className='white-bg'>
          <div className='flex-row'>
            <div className='btn-circle txt-bold' onClick={()=>changeBoardSize(-1)}>-</div>
            <h1 className='mg-s'>{boardSize}</h1>
            <div className='btn-circle txt-bold' onClick={()=>changeBoardSize(1)}>+</div>
          </div>
          <h1 className='btn-start' onClick={gameStart}>START</h1>
        </div>
        : <></>}

      {gameState === GameState.END ?
        <div className='grey-bg'>
          <div className='white-bg'>
            <h1 className='txt-large'>Game Over</h1>
            <h1 className='btn-start' onClick={gameStart}>Restart</h1>
          </div>
        </div>
        : <></>}

      <div className='container' style={{"--size": boardSize}}>
        { board.map((value, idx) => {
          return (
            <Box
              key={idx}
              idx={idx}
              isBalloon={value}
              boxClickEvent={boxClickEvent}/>
            ) 
          })}
      </div>
    </div>
  );
}

export default App;
