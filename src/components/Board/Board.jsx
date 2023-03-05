import styles from './Board.module.scss';
import React from 'react';
import Cell from './../common/Cell/Cell';
import { produce } from 'immer';
import { showEmptyCells, showGridLose, showGridWin } from './../../utils/index';
import smile from "./../../img/smile.png";
import loseSmile from "./../../img/loseSmile.png";
import winSmile from "./../../img/winSmile.png";

const Board = React.memo(props => {
  const { data, gameStatus, setGameStatus, grid, setGrid, mineCount, setMineCount } =
    props;

  const onLeftClick = (e, x, y) => {
    if ((grid[x][y].isOpen || grid[x][y].flagIndex > 0 || gameStatus !== smile)) {
      if([x][y].isMine) {
        return {
          ...grid,
          isOpenMine: true,
        }
      }
      return;
    }

    const updatedGrid = produce(grid, draft => {
      Object.assign(draft[x][y], { isOpen: true });
      if (draft[x][y].isEmpty) {
        showEmptyCells(data.height, data.width, x, y, draft);
      }
    });

    // Поражение
    if (updatedGrid[x][y].isMine) {
      const openedGrid = showGridLose(updatedGrid);
      setGrid(openedGrid);
      setGameStatus(loseSmile);
      return;
    }

    // Победа
    const hiddenGrid = updatedGrid.flat().filter(cell => !cell.isOpen);
    if (hiddenGrid.length === data.mines) {
      const finalGrid = showGridWin(updatedGrid);
      setGrid(finalGrid);
      setMineCount(0);
      setGameStatus(winSmile);
      return;
    }

    setGrid(updatedGrid);
  };

  const onRightClick = (e, x, y) => {
    e.preventDefault();
    if (grid[x][y].isOpen || gameStatus !== smile) return;

    let mineCountPlaceholder = mineCount;
    const updatedGrid = produce(grid, draft => {
      draft[x][y].flagIndex = draft[x][y].flagIndex > 1 ? 0 : draft[x][y].flagIndex + 1;

      draft[x][y].flagIndex === 1 && (mineCountPlaceholder -= 1);
      draft[x][y].flagIndex === 2 && (mineCountPlaceholder += 1);

      setMineCount(mineCountPlaceholder);
    });

    setGrid(updatedGrid);
  };

  return (
    <div
      className={styles.board}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.height}, 1fr)`,
        gridTemplateRows: `repeat(${data.width}, 1fr)`
      }}
    >
      {grid.map((row, i) =>
        row.map((col, j) => (
          <Cell
            onLClick={(e, i, j) => onLeftClick(e, i, j)}
            onRClick={(e, i, j) => onRightClick(e, i, j)}
            key={`${i}-${j}`}
            col={col}
            i={i}
            j={j}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
          />
        ))
      )}
    </div>
  );
});

export default Board;
