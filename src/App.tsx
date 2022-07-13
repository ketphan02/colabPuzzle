import React from 'react';
import { PuzzlePiece, Puzzle } from './components';

type PuzzlePieceProps = {
  positions: [number, number][];
  topDepth: number;
  setTopDepth: React.Dispatch<React.SetStateAction<number>>;
  gridPositions: [number, number][];
  puzzleImage: string; // TODO: This will become a blob
  puzzleImageSize: [number, number];
  numPieces: [number, number];
  pieceSize: number;
};

const _getLocationFromIndex = (index: number, numPieces: [number, number]): [number, number] => {
  const row = Math.floor(index / numPieces[0]);
  const col = index % numPieces[0];
  return [row, col];
}

const PuzzlePieces = (props: PuzzlePieceProps) => {
  const { positions, topDepth, setTopDepth, gridPositions, puzzleImage, puzzleImageSize, numPieces, pieceSize } = props;
  return (
    <>
      {Array.from({ length: numPieces[0] * numPieces[1] }).map((_, index) => {
        return (
          <PuzzlePiece
            key={index}
            id={`piece-${index}`}
            height={pieceSize}
            width={pieceSize}
            startPosition={{ top: positions[index][0], left: positions[index][1] }}
            topDepth={topDepth}
            setTopDepth={setTopDepth}
            gridPositions={gridPositions}
            puzzleImage={puzzleImage}
            puzzleImageSize={puzzleImageSize}
            location={_getLocationFromIndex(index, numPieces)}
          />
        );
      }
      )}
    </>
  );
}

type AppProps = {
  puzzleImage: string;
  numRows: number;
  numCols: number;
}

const App = (props: AppProps) => {
  const { puzzleImage, numRows, numCols } = props;

  const [topDepth, setTopDepth] = React.useState(0);
  const [gridPositions, setGridPositions] = React.useState<[number, number][]>([]);

  // Configurations
  const PUZZLE_SIZE = 800;
  const pieceSize = PUZZLE_SIZE / numRows; // Standard
  const IMG_SIZE: [number, number] = [pieceSize * numRows, pieceSize * numCols];

  const randomPosition = () => {
    const x = Math.floor(Math.random() * (window.innerHeight - pieceSize - 10));
    const y = Math.floor(Math.random() * (window.innerWidth - pieceSize - 10 - PUZZLE_SIZE) + PUZZLE_SIZE);
    return [x, y];
  }
  const positions = React.useRef(Array.from({ length: numCols * numRows }, () => randomPosition()) as [number, number][]);


  return (
    <>
      <PuzzlePieces
        positions={positions.current}
        topDepth={topDepth}
        setTopDepth={setTopDepth}
        gridPositions={gridPositions}
        puzzleImage={puzzleImage}
        puzzleImageSize={IMG_SIZE}
        numPieces={[numRows, numCols]}
        pieceSize={pieceSize}
      />
      <Puzzle setGridPositions={setGridPositions} numRows={numRows} numCols={numCols} width={pieceSize} height={pieceSize} />
    </>
  );
}

const PreApp = () => {
  return (
    <App numRows={5} numCols={5} puzzleImage={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'} />
  );
}

export default PreApp;
