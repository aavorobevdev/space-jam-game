import { DragEvent, useEffect, useState } from 'react';
import Earth from '../../assets/icons/earth.png';
import Mercury from '../../assets/icons/mercury.png';
import Neptune from '../../assets/icons/neptune.png';
import Planet from '../../assets/icons/planet.png';
import Saturn from '../../assets/icons/saturn.png';
import Venus from '../../assets/icons/venus.png';
import Empty from '../../assets/icons/empty.png';

const width = 8;
type AvailableColors =
  | 'Earth'
  | 'Mercury'
  | 'Neptune'
  | 'Planet'
  | 'Saturn'
  | 'Venus'
  | 'Empty';

const colors = [Earth, Mercury, Neptune, Planet, Saturn, Venus];

interface GamingBoardProps {
  handleScore: (score: number) => void;
}

export const GamingBoard = ({ handleScore }: GamingBoardProps) => {
  const [currentBoardColors, setCurrentBoardColors] = useState<
    AvailableColors[]
  >([]);

  const [colorBeingDragged, setColorBeingDragged] =
    useState<HTMLElement | null>(null);

  const [colorBeingReplaced, setColorBeingReplaced] =
    useState<HTMLElement | null>(null);

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const currentColor = currentBoardColors[i];
      const isEmpty = currentBoardColors[i] === Empty;

      if (
        columnOfFour.every(
          (color) => currentBoardColors[color] === currentColor && !isEmpty
        )
      ) {
        columnOfFour.forEach(
          (color) => (currentBoardColors[color] = Empty as AvailableColors)
        );
        handleScore(4);
        return true;
      }
    }
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const currentColor = currentBoardColors[i];
      const isEmpty = currentBoardColors[i] === Empty;

      if (
        columnOfThree.every(
          (color) => currentBoardColors[color] === currentColor && !isEmpty
        )
      ) {
        columnOfThree.forEach(
          (color) => (currentBoardColors[color] = Empty as AvailableColors)
        );
        handleScore(3);
        return true;
      }
    }
  };

  const checkRowOfThree = () => {
    for (let i = 0; i < 61; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const currentColor = currentBoardColors[i];
      const isEmpty = currentBoardColors[i] === Empty;

      const notValidIndex = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValidIndex.includes(i)) continue;

      if (
        rowOfThree.every(
          (color) => currentBoardColors[color] === currentColor
        ) &&
        !isEmpty
      ) {
        rowOfThree.forEach(
          (color) => (currentBoardColors[color] = Empty as AvailableColors)
        );
        handleScore(3);
        return true;
      }
    }
  };

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const currentColor = currentBoardColors[i];
      const isEmpty = currentBoardColors[i] === Empty;

      const notValidIndex = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValidIndex.includes(i)) continue;

      if (
        rowOfFour.every(
          (color) => currentBoardColors[color] === currentColor
        ) &&
        !isEmpty
      ) {
        rowOfFour.forEach(
          (color) => (currentBoardColors[color] = Empty as AvailableColors)
        );
        handleScore(4);
        return true;
      }
    }
  };

  const moveIntoSquareBellow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentBoardColors[i] === Empty) {
        let randomNumber = Math.floor(Math.random() * colors.length);
        currentBoardColors[i] = colors[randomNumber] as AvailableColors;
      }

      if (currentBoardColors[i + width] === Empty) {
        currentBoardColors[i + width] = currentBoardColors[i];
        currentBoardColors[i] = Empty;
      }
    }
  };

  const handleDragStart = (e: DragEvent<HTMLImageElement>): void => {
    setColorBeingDragged(e.target as any);
  };

  const handleDrop = (e: DragEvent<HTMLImageElement>): void => {
    setColorBeingReplaced(e.target as any);
  };

  const handleDragEnd = (e: DragEvent<HTMLImageElement>): void => {
    const colorBeingReplacedId = parseInt(
      colorBeingReplaced?.getAttribute('data-id') as string
    );
    const colorBeingDraggedId = parseInt(
      colorBeingDragged?.getAttribute('data-id') as string
    );

    currentBoardColors[colorBeingReplacedId] = colorBeingDragged!.getAttribute(
      'src'
    ) as AvailableColors;

    currentBoardColors[colorBeingDraggedId] = colorBeingReplaced!.getAttribute(
      'src'
    ) as AvailableColors;

    const validMoves = [
      colorBeingDraggedId - 1,
      colorBeingDraggedId - width,
      colorBeingDraggedId + 1,
      colorBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(colorBeingReplacedId);

    const isAColumnOfFour = checkColumnOfFour();
    const isAColumnOfThree = checkColumnOfThree();
    const isARowOfFour = checkRowOfFour();
    const isARowOfThree = checkRowOfThree();

    if (
      colorBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      setColorBeingDragged(null);
      setColorBeingReplaced(null);
    } else {
      currentBoardColors[colorBeingReplacedId] =
        colorBeingReplaced?.getAttribute('src') as AvailableColors;

      currentBoardColors[colorBeingDraggedId] = colorBeingDragged?.getAttribute(
        'src'
      ) as AvailableColors;
      setCurrentBoardColors([...currentBoardColors]);
    }
  };

  const createBoard = () => {
    const randomColors: AvailableColors[] = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      randomColors.push(randomColor as AvailableColors);
    }
    setCurrentBoardColors(randomColors);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      checkRowOfFour();
      checkRowOfThree();
      checkColumnOfFour();
      checkColumnOfThree();
      moveIntoSquareBellow();
      setCurrentBoardColors([...currentBoardColors]);
    }, 100);

    return () => {
      clearInterval(timerId);
    };
  }, [
    checkColumnOfFour,
    checkRowOfFour,
    checkColumnOfThree,
    checkRowOfThree,
    moveIntoSquareBellow,
    currentBoardColors,
  ]);

  return (
    <div className="game">
      {currentBoardColors.map((color, index) => (
        <img
          key={index}
          alt={color}
          src={color}
          data-id={index}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        />
      ))}
    </div>
  );
};
