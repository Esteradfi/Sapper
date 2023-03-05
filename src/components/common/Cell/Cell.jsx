import styles from './Cell.module.scss';
import cell from "./../../../img/cell.png";
import cell1 from "./../../../img/cell1.png";
import cell2 from "./../../../img/cell2.png";
import cell3 from "./../../../img/cell3.png";
import cell4 from "./../../../img/cell4.png";
import cell5 from "./../../../img/cell5.png";
import cell6 from "./../../../img/cell6.png";
import cell7 from "./../../../img/cell7.png";
import cell8 from "./../../../img/cell8.png";
import cellEmpty from "./../../../img/cellEmpty.png";
import mine from "./../../../img/openBomb.png";
import detonatedMine from "./../../../img/detonatedBomb.png";
import checkbox from "./../../../img/checkbox.png";
import question from "./../../../img/question.png";
import fearSmile from "./../../../img/fearSmile.png";
import smile from "./../../../img/smile.png";

const Cell = ({ col, i, j, onLClick, onRClick, gameStatus, setGameStatus }) => {

  const getColor = neighbor => {
    switch (neighbor) {
      case 1:
        return cell1;
      case 2:
        return cell2;
      case 3:
        return cell3;
      case 4:
        return cell4;
      case 5:
        return cell5;
      case 6:
        return cell6;
      case 7:
        return cell7;
      case 8:
        return cell8;
      default:
        return cellEmpty;
    }
  };

  const getValue = cellData => {
    const { isMine, isOpen, isOpenMine, neighbors, flagIndex } = cellData;
    if (!isOpen) return flagIndex ? (flagIndex === 1 ? checkbox : question) : cell;
    if (isMine && isOpenMine) return detonatedMine;
    if (isMine) return mine;
    if (isOpen && !isMine) return getColor(neighbors);
  };

  return (
    <img
      data-dimension={`${i}-${j}`}
      onClick={e => onLClick(e, i, j)}
      onContextMenu={e => onRClick(e, i, j)}
      className={styles.cellImage}
      onMouseDown={() => setGameStatus(fearSmile)}
      onMouseUp={() => setGameStatus(smile)}
      src={col.flagIndex ? getValue(col) : (col.isOpen ? getValue(col): cell)}
      draggable="false"
      alt="cell"
    />
  );
};

export default Cell;
