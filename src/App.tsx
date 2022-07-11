import React from 'react';
import { PuzzlePiece, Puzzle } from './components';

type PuzzlePieceProps = {
  colors: string[];
  positions: [number, number][];
  topDepth: number;
  setTopDepth: React.Dispatch<React.SetStateAction<number>>;
  gridPositions: [number, number][];
};

const PuzzlePieces = (props: PuzzlePieceProps) => {
  const { colors, positions, topDepth, setTopDepth, gridPositions } = props;
  return (
    <>
      {colors.map((color, index) => {
        return (
          <PuzzlePiece
            key={index}
            id={`piece-${index}`}
            height={200}
            width={200}
            startPosition={{ top: positions[index][0], left: positions[index][1], color }}
            topDepth={topDepth}
            setTopDepth={setTopDepth}
            gridPositions={gridPositions}
          />
        );
      }
      )}
    </>
  );
}

const App = () => {
  const [topDepth, setTopDepth] = React.useState(0);
  const [gridPositions, setGridPositions] = React.useState<[number, number][]>([]);
  // 9 random colors
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', 'grey', '#000000', '#ffa500'];
  const randomPosition = () => {
    const x = Math.floor(Math.random() * (window.innerHeight - 200));
    const y = Math.floor(Math.random() * (window.innerWidth - 200));
    return [x, y];
  }
  const positions = React.useRef(Array.from({ length: 9 }, () => randomPosition()) as [number, number][]);

  return (
    <>
      <PuzzlePieces colors={colors} positions={positions.current} topDepth={topDepth} setTopDepth={setTopDepth} gridPositions={gridPositions} />
      <Puzzle setGridPositions={setGridPositions} />
    </>
  );
}

export default App;
