import * as s from './Playground.module.css'
import {CellsBackground} from "@src/shared/ui/cells-background/CellsBackground";
import {useAppDispatch, useAppSelector} from "@src/app/stores";
import {
    addScore,
    getCells, getScore,
    getSpawnedIndex,
    getStackedIndexes,
    setCells, setGameOver,
    setSpawnedIndex,
    setStackedIndexes
} from "@src/entities/game/model";
import {Cell} from "@src/entities/game/ui/cell";
import {useEffect, useRef} from "react";
import {animateBottom, animateLeft, animateRight, animateTop, spawnCell} from "@src/entities/game/lib";

const processMethod = {
    "ArrowUp": animateTop,
    "ArrowDown": animateBottom,
    "ArrowLeft": animateLeft,
    "ArrowRight": animateRight,
}

type ProcessKey = keyof typeof processMethod

export const Playground = () => {
    const cells = useAppSelector(state => getCells(state))
    const spawnedIndex = useAppSelector(state => getSpawnedIndex(state))
    const stackedIndexes = useAppSelector(state => getStackedIndexes(state))
    const containerRef = useRef<HTMLDivElement>(null);
    const currentScore = useAppSelector(state => getScore(state))
    const dispatch = useAppDispatch();

    useEffect(() => {
        let spawned = spawnCell(cells).cells;
        spawned = spawnCell(spawned).cells
        dispatch(setCells(spawned))
    }, []);

    useEffect(() => {
        const keyboardActions = (e: KeyboardEvent) => {
            if (containerRef.current && processMethod[e.key as ProcessKey]) {

                //game over check
                const isGameOver = Object.values(processMethod).every(process => {
                    const result = process(cells)
                    return !result.hasMovedCell && !result.hasStackedCell
                })

                if (isGameOver) {
                    const currentBestScore = Number(localStorage.getItem('best_score'))
                    if (!currentBestScore || currentBestScore < currentScore) {
                        localStorage.setItem('best_score', currentScore.toString())
                    }
                    dispatch(setGameOver(true))
                }

                const {
                    animated,
                    actual,
                    stackedIndexes,
                    hasStackedCell,
                    hasMovedCell,
                    score
                } = processMethod[e.key as ProcessKey](cells)

                if (!hasMovedCell && !hasStackedCell) {
                    return
                }

                const flatAnimated = animated.flat()
                const child = containerRef.current.children as HTMLCollectionOf<HTMLDivElement>

                const spawnedResult = spawnCell(actual)

                for (let i = 0; i < child.length; i++) {
                    child[i].style.transform = flatAnimated[i]
                }

                const timeCall = performance.now()
                const animate = () => {
                    if (performance.now() - timeCall >= 100) {
                        dispatch(addScore(score))
                        dispatch(setCells(spawnedResult.cells))
                        dispatch(setSpawnedIndex(spawnedResult.spawnIndex))
                        dispatch(setStackedIndexes(stackedIndexes))
                    } else {
                        requestAnimationFrame(animate)
                    }
                }
                requestAnimationFrame(animate)
            }
        }

        document.body.addEventListener('keyup', keyboardActions);
        return () => {
            document.body.removeEventListener('keyup', keyboardActions)
            const child = containerRef.current?.children as HTMLCollectionOf<HTMLDivElement>
            for (let i = 0; i < child.length; i++) {
                child[i].style.transform = ''
            }
        };
    }, [cells]);

    return (
        <div className={s.container}>
            <div className={s.absolute}>
                <CellsBackground/>
            </div>

            <div className={s.playground} ref={containerRef}>
                {
                    cells.flat().map((i, index) => (
                        <Cell
                            key={index}
                            value={i}
                            spawned={index === spawnedIndex}
                            stacked={stackedIndexes.includes(index)}
                        />
                    ))
                }
            </div>
        </div>
    );
};