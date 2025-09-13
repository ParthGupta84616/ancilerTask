import { useState } from 'react';
import LotteryContainer from './components/LotteryContainer';
import Button from './components/Button';
import ResultMessage from './components/ResultMessage';

function App() {
  const [slots, setSlots] = useState<number[]>([0, 0, 0]);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [history, setHistory] = useState<Array<'win' | 'lose'>>([]);

  const getRandom = () => Math.floor(Math.random() * 6) + 1;

  const handleStart = () => {
    const newSlots = [getRandom(), getRandom(), getRandom()];
    setSlots(newSlots);
    
    const gameResult = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2] ? 'win' : 'lose';
    setResult(gameResult);
    setHistory(prevHistory => [...prevHistory, gameResult]);
  };

  const handleReset = () => {
    setSlots([0, 0, 0]);
    setResult(null);
  };

  const wins = history.filter(r => r === 'win').length;
  const losses = history.filter(r => r === 'lose').length;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Lottery Game
        </h1>

        <div className="flex justify-center space-x-4">
          {slots.map((slot, index) => (
            <LotteryContainer
              key={index}
              number={slot}
              spinning={false}
            />
          ))}
        </div>

        <ResultMessage result={result} />

        <div className="flex justify-center space-x-4">
          <Button onClick={handleStart}>
            Generate Numbers
          </Button>
          <Button onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Game History
          </h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Wins: {wins}</span>
            <span>Losses: {losses}</span>
            <span>Total: {history.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;