import styles from './Sapper.module.scss';
import Board from '../Board/Board.jsx';
import { useEffect, useState } from 'react';
import { initBoard } from './../../utils/index';
import smile from "./../../img/smile.png";

const Sapper = () => {
    const data = {
        width: 16,
        height: 16,
        mines: 40
    };
    const [gameStatus, setGameStatus] = useState(smile);
    const [grid, setGrid] = useState(() => initBoard(data));
    const [mineCount, setMineCount] = useState(data.mines);
    const [seconds, setSeconds] = useState(0);
    const [isTimeActive, setIsTimeActive] = useState(true);

    useEffect(() => {
        let interval = null;

        if (isTimeActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        }
        if ((!isTimeActive && seconds !== 0) || seconds >= 999) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isTimeActive, seconds]);

    const resetGame = setupData => {
        setGameStatus(smile);
        setGrid(initBoard(setupData));
        setMineCount(40);

        setSeconds(0);
        setIsTimeActive(true);
    };

    return (
        <div className={[styles.game, 'paper'].join(' ')}>
            <div className={styles.control}>
                <h3>Счет: {mineCount}</h3>
                <img src={gameStatus} className={styles.resetGame} onClick={() => resetGame(data)} alt="status" />
                <h3>Время: {seconds}</h3>
            </div>
            <Board
                data={data}
                gameStatus={gameStatus}
                setGameStatus={setGameStatus}
                grid={grid}
                setGrid={setGrid}
                mineCount={mineCount}
                setMineCount={setMineCount}
            />
        </div>
    );
};

export default Sapper;