import * as React from 'react';
import styles from './styles.module.scss';

type PuzzleProps = {
  setGridPositions: React.Dispatch<React.SetStateAction<[number, number][]>>;
};

const Puzzle = (props: PuzzleProps) => {
  const numRows = 3; // TODO: get this from props
  const numCols = 3; // TODO: get this from props
  const width = 200; // TODO: get this from props
  const height = 200; // TODO: get this from props
  const { setGridPositions } = props;
  const childRefs = [...Array.from({ length: numCols * numRows })].map(() => React.createRef<HTMLDivElement>());

  React.useEffect(() => {
    const positions: [number, number][] = [];
    childRefs.forEach((ref) => {
      const child = ref.current;
      if (child) {
        positions.push([child.offsetLeft, child.offsetTop]);
      }
    });
    setGridPositions(positions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGridPositions]);

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: numRows }).map((_, rowIndex) => {
        return (
          <div className={styles.row} key={rowIndex} style={{ display: 'flex' }}>
            {Array.from({ length: numCols }).map((_, colIndex) => {
              return (
                <div
                  className={styles.puzzlePiece}
                  ref={childRefs[rowIndex * numCols + colIndex]}
                  key={colIndex}
                  style={{ width: width, height: height, border: '2px solid black' }}>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Puzzle;
