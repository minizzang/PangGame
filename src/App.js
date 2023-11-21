import './App.css';
import { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

import Pang from './Pang';
import sun from './assets/sun.png'
import moon from './assets/moon.png'

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

  useEffect(() => {
    const pathname = window.location.pathname.split('/')[1];
    const url = new URLSearchParams(pathname);
    
    const gameState = url.get("gameState");
    const theme = url.get("theme");
    const boardSize = url.get("boardSize");
    const board = url.get("board");
    
    if (gameState != null) setGameState(gameState);
    if (theme != null) document.getElementById('root-container').dataset.theme = theme;
    if (boardSize != null) {
      pang.boardSize = Number(boardSize);
      setBoardSize(Number(boardSize));
    }
    if (board != null) {
      const remainingBoard = board.split(',').map(elem => elem === 'true');
      pang.board = remainingBoard;
      setBoard(remainingBoard);
      pang.calculateBoardLogic();
    }
  }, []);
  
  // Apply current game status to URL
  useEffect(() => {
    changeURL();
  }, [board, gameState]);

  const changeURL = () => {
    let currentState = {
      gameState: gameState,
      theme: document.getElementById('root-container').dataset.theme,
      boardSize: boardSize,
      board: board
    }
    let params = new URLSearchParams(currentState).toString();

    window.history.pushState("", null, params);
  }

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

  const changeTheme = (isDarkMode) => {
    document.getElementById('root-container').dataset.theme = isDarkMode ? 'dark' : 'light';
    changeURL();
  }

  return (
    <div id='root-container' className="App" data-theme='light'>
      <h1 className='m-top'>Pang Game</h1>
      <div className='toggle-box'>
        <Toggle
          className='toggle'
          defaultChecked={false}
          icons={{
            checked: <img className='toggle-ic' src={sun} alt='light'/>,
            unchecked: <img className='toggle-ic' src={moon} alt='dark'/>
          }}
          onChange={(e) => changeTheme(e.target.checked)}
        />
      </div>

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
