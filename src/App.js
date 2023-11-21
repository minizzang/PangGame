import './App.css';
import { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

import Pang from './Pang';
import sun from './assets/sun.png'
import moon from './assets/moon.png'
import { GAME_STATE, INIT_BOARD_SIZE } from './constants';

let pang = new Pang(INIT_BOARD_SIZE);

function Box({idx, isBalloon, boxClickEvent}) {
  return (
    <div
      className={ "box" + (isBalloon ? " balloon" : "")}
      onClick={() => boxClickEvent(idx)}></div>
  )
}

function App() {
  const [boardSize, setBoardSize] = useState(INIT_BOARD_SIZE);
  const [board, setBoard] = useState(pang.board);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);

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
    if (gameState === GAME_STATE.DURING) {
      pang.shootBalloon(idx, gameOver);
      setBoard([...pang.board]);
    }
  }

  const goFirstPage = () => {
    pang.createEmptyBoard(INIT_BOARD_SIZE);
    setGameState(GAME_STATE.BEFORE);
    setBoard(pang.board);
    setBoardSize(INIT_BOARD_SIZE);
  }

  const gameStart = () => {
    setGameState(GAME_STATE.DURING);
    pang.createRandomBoard();
    setBoard([...pang.board]);
  }

  const gameOver = (isSucceed) => {
    console.log("sdfhi");
    if (isSucceed) setGameState(GAME_STATE.SUCCESS);
    else setGameState(GAME_STATE.FAIL);
  }

  const changeTheme = (isDarkMode) => {
    document.getElementById('root-container').dataset.theme = isDarkMode ? 'dark' : 'light';
    changeURL();
  }

  return (
    <div id='root-container' className="App" data-theme='light'>
      <h1 className='m-top' onClick={goFirstPage}>Pang Game</h1>
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

      {gameState === GAME_STATE.BEFORE ? 
        <div className='white-bg'>
          <div className='flex-row'>
            <div className='btn-circle txt-bold' onClick={()=>changeBoardSize(-1)}>-</div>
            <h1 className='mg-s'>{boardSize}</h1>
            <div className='btn-circle txt-bold' onClick={()=>changeBoardSize(1)}>+</div>
          </div>
          <h1 className='btn-round-bg' onClick={gameStart}>START</h1>
        </div>
        : <></>}

      {gameState === GAME_STATE.FAIL ?
        <div className='grey-bg'>
          <div className='white-bg'>
            <h1 className='txt-large'>Game Over</h1>
            <h1 className='btn-round-bg' onClick={gameStart}>Restart</h1>
            <h3 className='btn-round-bg' onClick={goFirstPage}>Go to main</h3>
          </div>
        </div>
        : <></>}

      {gameState === GAME_STATE.SUCCESS ?
        <div className='grey-bg'>
          <div className='white-bg'>
            <h1 className='txt-large'>CLEAR!</h1>
            <h1 className='btn-round-bg' onClick={gameStart}>Next Stage</h1>
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
