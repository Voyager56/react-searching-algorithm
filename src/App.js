import './App.css';
import {useState} from 'react';



const createBoard = () => {
  return Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)));
};

const searchArray = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === target) {
        return [i+1, j+1];
      }
    }
  }
  return [-1, -1];
};



function App() {
  const [board, setBoard] = useState(createBoard());
  const [target, setTarget] = useState(Math.floor(Math.random() * 100));
  const [found, setFound] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [row, col] = searchArray(board, Number(target));
    console.log(row, col);
    setFound(row !== -1);
    setRow(row);
    setCol(col);
  };


  const handleReset = () => {
    setBoard(createBoard());
    setTarget(Math.floor(Math.random() * 100));
    setFound(false);
    setRow(0);
    setCol(0);
  };

  return (
    <div className="App">
      <h1>Find the target</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Target:
          <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleReset}>Reset</button>
      <div className="status">
        {found ? (
          <div>
            <h1>Found! at Row: {row} Col: {col}</h1>
          </div>
        ) : (
          <p>Not Found</p>
        )}
      </div>
      <table className="board">
        <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <td key={j} className={`${found && row === row && col === col ? 'found' : ''}`}>
                {col}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
          

}

export default App;
