import React from 'react';

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => {
  return (
    <div className="font-body text-2xl font-extrabold text-purple-600">
      Score:{score}
    </div>
  );
};
