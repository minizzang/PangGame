import './App.css';
import { useState } from 'react';
import Pang from './Pang';

const boardSize = 6;
let pang = new Pang(boardSize);

function Box({idx, isBalloon, setBoard}) {
  return (
    <div
      className={ "box" + (isBalloon ? " balloon" : "")}
      onClick={() => {pang.shootBalloon(idx); setBoard([...pang.board])}}></div>
    )
}
  
function App() {
  const [board, setBoard] = useState( pang.board );
 
  return (
    <div className="App">
      <div className='container' style={{"--size": boardSize}}>
        { board.map((value, idx) => {
          return (
            <Box
              key={idx}
              idx={idx}
              isBalloon={value}
              setBoard={setBoard}/>
          ) 
        })}
      </div>
    </div>
  );
}

export default App;
