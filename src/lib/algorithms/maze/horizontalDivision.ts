import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";
import { recursiveDivision } from "./recursiveDivision";

export const horizontalDivision = async({grid,startTile,endTile,row,col,height,width,setIsDisabled,speed}:{
    grid:GridType;
    startTile:TileType;
    endTile:TileType;
    row:number;
    col:number;
    height:number;
    width:number;
    setIsDisabled:(isDisable:boolean)=>void;
    speed:SpeedType;

})=>{
    const makeWallAt = row+getRandInt(0,height-1)*2+1;
    const makePassgeAt = col+getRandInt(0,width)*2;

    for(let i = 0; i < 2*width-1; i++){
        if(makePassgeAt !== col + i){
            if((!isEqual(grid[makeWallAt][col+i],startTile)&&!isEqual(grid[makeWallAt][col+i],endTile))){
                grid[makeWallAt][col+i].isWall = true;
                document.getElementById(`${makeWallAt}-${col+i}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
                await sleep(10*SPEEDS.find((e)=>e.value === speed)!.value-5); 
            }
        }
    }

    await recursiveDivision({grid,startTile,endTile,row,col,
        height:(makeWallAt-row+1)/2 
        ,width,setIsDisabled,speed});
        
    await recursiveDivision({grid,startTile,endTile,
        row:makeWallAt+1,
        col,
        height:height-(makeWallAt-row+1)/2 ,
        width,setIsDisabled,speed});
}