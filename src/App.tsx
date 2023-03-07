import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GamingBoard } from './components/game-board';
import { GameInfo } from './components/game-info';
import { Score } from './components/score';
import './index.css';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
    },
  },
};

const App = () => {
  const [score, setScore] = useState(0);

  const handleScore = (score: number) => {
    setScore((prevScore) => prevScore + score);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="App"
    >
      <GameInfo>
        <Score score={score} />
      </GameInfo>
      <GamingBoard handleScore={handleScore} />
    </motion.div>
  );
};

export default App;
