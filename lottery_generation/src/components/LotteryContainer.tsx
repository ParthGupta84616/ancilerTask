import React from 'react';

interface LotteryContainerProps {
  number: number;
  spinning: boolean;
}

const LotteryContainer: React.FC<LotteryContainerProps> = ({ number, spinning }) => {
  return (
    <div 
      className={`
        w-24 h-24 bg-white border-2 border-gray-300 rounded-lg 
        flex items-center justify-center text-3xl font-bold
        ${spinning ? 'animate-spin' : ''}
        shadow-lg
      `}
    >
      {spinning ? '?' : number || '0'}
    </div>
  );
};

export default LotteryContainer;