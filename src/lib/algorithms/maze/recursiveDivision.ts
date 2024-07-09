import { GridType, SpeedType, TileType } from "../../../utils/types";
import { horizontalDivision } from "./horizontalDivision";
import { verticalDivision } from "./verticalDivision";

export const recursiveDivision=async({grid,startTile,endTile,row,col,height,width,setIsDisabled,speed}:{
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
    if(height<=1||width<=1){
        return;
    }
    if(height>width){
        //horizontal
        await horizontalDivision({grid,startTile,endTile,row,col,height,width,setIsDisabled,speed});
    }else{
        //vertical
        await verticalDivision({grid,startTile,endTile,row,col,height,width,setIsDisabled,speed});
        
    }
}