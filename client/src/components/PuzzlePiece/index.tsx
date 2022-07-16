import * as React from 'react';
import styles from './styles.module.scss';

import socket from '../../utils/getSocket';

type PuzzlePieceProps = {
  id: string;
  height: number;
  width: number;
  startPosition: {
    top: string;
    left: string;
    opacity?: number;
  };
  topDepth: number;
  setTopDepth: React.Dispatch<React.SetStateAction<number>>;
  gridPositions: [number, number][];
  puzzleImage: string; // TODO: This will become a blob
  puzzleImageSize: [number, number];
  location: [number, number]; // [row, col]
};

const PuzzlePiece = (puzzleProps: PuzzlePieceProps) => {
  const {
    id, // This should not be used since it's too obvious // TODO: Hash this
    height,
    width,
    startPosition,
    topDepth,
    setTopDepth,
    puzzleImage,
    puzzleImageSize,
    location,
  } = puzzleProps;

  const [isDragging, setIsDragging] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(0);
  const HEIGHT = height;
  const WIDTH = width;

  const handleOnDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setZIndex(topDepth + 1);
    setTopDepth(topDepth + 1);
    setIsDragging(true);

    socket.emit('puzzleMove', {
      sender: socket.id,
      newPiece: Object.assign({
        id: e.currentTarget.id,
        startPosition: { top: e.currentTarget.style.top, left: e.currentTarget.style.left, opcacity: 50 }
      }, puzzleProps),
    });

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
    const clientX = e.clientX - WIDTH / 2;
    const clientY = e.clientY - HEIGHT / 2;
    console.log("drag end: ", clientX, clientY);
    let speacialLocTop, speacialLocLeft;
    for (const element of puzzleProps.gridPositions) {
      const [gridX, gridY] = element;
      if (_calculateDistance(clientX, clientY, gridX, gridY) < 50) {
        e.currentTarget.style.left = `${gridX + .5}px`;
        e.currentTarget.style.top = `${gridY + 1}px`;
        speacialLocLeft = `${gridX + 1}px`;
        speacialLocTop = `${gridY + .5}px`;
        break;
      }
    }

    socket.emit('puzzleDrop', {
      sender: socket.id,
      newPiece: {
        ...puzzleProps, ...{
          startPosition: {
            id: e.currentTarget.id,
            top: speacialLocTop || `${e.currentTarget.style.top}px`,
            left: speacialLocLeft || `${e.currentTarget.style.left}px`,
            opcacity: 100
          }
        }
      }
    });
  }

  return (
    <div
      id={id}
      className={styles.wrapper}
      style={{
        position: 'absolute',
        top: startPosition.top,
        left: startPosition.left,
        zIndex: zIndex,
        height: HEIGHT,
        width: WIDTH,
        overflow: 'hidden'
      }}
      onMouseDown={handleOnDragStart}
      onMouseUp={handleOnDragEnd}
      onMouseMoveCapture={handleWhileDragging}
    >
      <img src={puzzleImage} alt="puzzle" width={puzzleImageSize[1]} height={puzzleImageSize[0]} style={{
        marginTop: `-${HEIGHT * location[1]}px`,
        marginLeft: `-${WIDTH * location[0]}px`,
      }} />
    </div >
  );
}

export default PuzzlePiece;
