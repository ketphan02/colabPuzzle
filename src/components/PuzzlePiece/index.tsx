import * as React from 'react';
import styles from './styles.module.scss';

type PuzzlePieceProps = {
  id: string;
  height: number;
  width: number;
  startPosition: {
    top: number;
    left: number;
    color?: string;
  };
  topDepth: number;
  setTopDepth: React.Dispatch<React.SetStateAction<number>>;
  gridPositions: [number, number][];
};

const PuzzlePiece = (puzzleProps: PuzzlePieceProps) => {
  const { id, height, width, startPosition, topDepth, setTopDepth } = puzzleProps;

  const [isDragging, setIsDragging] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(0);
  const HEIGHT = height;
  const WIDTH = width;

  const handleOnDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setZIndex(topDepth + 1);
    setTopDepth(topDepth + 1);
    setIsDragging(true);
  }

  const handleWhileDragging = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    e.currentTarget.style.left = `${e.clientX - WIDTH / 2}px`;
    e.currentTarget.style.top = `${e.clientY - HEIGHT / 2}px`;
  }

  const _calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    console.log('drag end');
    const clientX = e.clientX - WIDTH / 2;
    const clientY = e.clientY - HEIGHT / 2;
    for (const element of puzzleProps.gridPositions) {
      const [gridX, gridY] = element;
      if (_calculateDistance(clientX, clientY, gridX, gridY) < 50) {
        e.currentTarget.style.left = `${gridX + 2}px`;
        e.currentTarget.style.top = `${gridY + 2}px`;
        return;
      }
    }
  }

  return (
    <div
      id={id}
      className={styles.wrapper}
      style={{
        top: startPosition.top,
        left: startPosition.left,
        backgroundColor: startPosition.color,
        zIndex: zIndex,
        height: HEIGHT,
        width: WIDTH
      }}
      onMouseDown={handleOnDragStart}
      onMouseUp={handleOnDragEnd}
      onMouseMoveCapture={handleWhileDragging}
    >
    </div >
  );
}

export default PuzzlePiece;
