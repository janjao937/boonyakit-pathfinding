import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding"
import { useTile } from "../hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType } from "../utils/types";
import { Select } from "./Select"
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export const Nav = ({isVisualizationRunningRef}:{
    isVisualizationRunningRef:MutableRefObject<boolean>
})=>{
    const {maze,setMaze,grid,setGrid,setIsGraphVisualized,setAlgorithm,algorithm,isGraphVisualized} = usePathfinding();
    const {startTile,endTile} = useTile();
    const {speed} = useSpeed();
    const [isDisabled,setIsDisabled] = useState(false);

    const handleGenerateMaze = (maze:MazeType)=>{
        if(maze==="NONE"){
            setMaze(maze);
            resetGrid({grid,startTile,endTile});
            return;
        }

        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({maze,grid,startTile,endTile,setIsDisabled,speed}); //run mazeAlgorithim
        const newGrid = grid.slice();
        setGrid(newGrid);
        setIsGraphVisualized(false);
    }

    const handlerRunVisalizer = ()=>{
        if(isGraphVisualized){
            setIsGraphVisualized(false);
            resetGrid({grid:grid.slice(),startTile,endTile});
            return;
        }
        //run algorithm
        const {traversedTiles,path}=runPathfindingAlgorithm({algorithm,grid,startTile,endTile});
        animatePath(traversedTiles,path,startTile,endTile,speed);
        setIsDisabled(true);
        isVisualizationRunningRef.current = true;
        setTimeout(()=>{
            const newGrid = grid.slice();
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisualizationRunningRef.current = false;
        },(SLEEP_TIME*(traversedTiles.length+SLEEP_TIME*2)+EXTENDED_SLEEP_TIME*path.length+60)*SPEEDS.find(e=>e.value===speed)!.value);
    
    }


    return (
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                   Boon Pathfinding
                </h1>
                <div className="flex sm:items-end items-center justify-start sm:jsutify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                <Select 
                label="MAZE" 
                value={maze}
                option={MAZES}
                onChange={(e)=>{handleGenerateMaze(e.target.value as MazeType)}}
                />
                <Select 
                label="Graph"
                value={algorithm}
                option={PATHFINDING_ALGORITHMS}
                onChange={(e)=>{setAlgorithm(e.target.value as AlgorithmType)}}
                />
                <PlayButton isDisabled= {isDisabled} isGraphVisualized={isGraphVisualized} handlerRunVisalizer={handlerRunVisalizer} />
                </div>
            </div>
        </div>
    )
}