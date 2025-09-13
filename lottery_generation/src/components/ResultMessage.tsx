import React from 'react';

interface ResultMessageProps {
  result: 'win' | 'lose' | null;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div 
      className={`
        text-2xl font-bold py-4 px-6 rounded-lg text-center
        ${result === 'win' 
          ? 'text-green-600 bg-green-100 border border-green-200' 
          : 'text-red-600 bg-red-100 border border-red-200'
        }
      `}
    >
      {result === 'win' ? '🎉 YOU WIN! 🎉' : '😞 YOU LOSE 😞'}
    </div>
  );
};

export default ResultMessage;