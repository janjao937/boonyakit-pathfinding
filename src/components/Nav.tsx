import { useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding"
import { useTile } from "../hooks/useTile";
import { MAZES } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { MazeType } from "../utils/types";
import { Select } from "./Select"
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";

export const Nav = ()=>{
    const {maze,setMaze,grid,setGrid,setIsGraphVisualized} = usePathfinding();
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
                </div>
            </div>
        </div>
    )
}