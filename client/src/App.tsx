import React from 'react';
import { PuzzlePiece, Puzzle, Header } from './components';

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
    const availableWidth = (window.innerWidth - PUZZLE_SIZE) / 2;

    const x = Math.floor(Math.random() * (window.innerHeight - pieceSize - 10));
    const y = Math.random() > .5
      ? Math.floor(Math.random() * (availableWidth - pieceSize))
      : Math.floor(Math.random() * (availableWidth - pieceSize)) + availableWidth + PUZZLE_SIZE;

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

const RANDOM_PAINTINGS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2020/10/delacroix-liberty-1.jpg',
  'https://www.creativelive.com/blog/wp-content/uploads/2018/08/AdobeStock_89641238-620x413.jpeg',
  'https://i0.wp.com/bookmypainting.com/wp-content/uploads/2019/06/the-persistence-of-memory-the-famous-painting-2.jpeg?resize=566%2C430&ssl=1',
  'https://i.pinimg.com/originals/88/01/15/880115aa48590cb0039bc86bd4e2bfaf.jpg',
  'https://th-thumbnailer.cdn-si-edu.com/0QiZVVAXyhRwys9S45_LdWq5Fjc=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/45/f2/45f224a9-83e0-470e-8388-3de5eeb6428b/air_pump.jpg',
];

const PreApp = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'none',  }}>
      <div>
        <Header />
      </div>
      <div>
      <App numRows={8} numCols={8} puzzleImage={RANDOM_PAINTINGS[Math.floor(Math.random() * RANDOM_PAINTINGS.length)]} />
      {/* <App numRows={2} numCols={4} puzzleImage={'https://media-exp1.licdn.com/dms/image/C4E03AQEiJgoaUt3kiA/profile-displayphoto-shrink_800_800/0/1584653176013?e=1663200000&v=beta&t=CJ2JSjLnwmQbXVfhMGs3evJ5MP-cje4Xdrad6vAyZWs'} /> */}
      </div>
    </div>
  );
}

export default PreApp;
