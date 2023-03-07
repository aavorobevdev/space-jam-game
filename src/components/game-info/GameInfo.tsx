import React, { PropsWithChildren } from 'react';

interface GameInfoProps extends PropsWithChildren {
  level?: number;
}

export const GameInfo = ({ children }: GameInfoProps) => {
  return (
    <div className=" flex-col items-center  bg-primary border-t-primary rounded-t-md ">
      <h1 className=" text-6xl font-title text-purple-600">SPACE JAM</h1>
      {children}
    </div>
  );
};
