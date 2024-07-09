import { ChangeEvent } from "react";

export const Select = ({value,onChange,option,label,isDisabled}:{
    value:string|number;
    label:string;
    onChange:(value:ChangeEvent<HTMLSelectElement>)=>void;
    option:{value:string|number;name:string}[];
    isDisabled:boolean;
})=>{

    return (
        <div className="flex flex-col items-start gap-1">
            <label className="text-xs text-gray-300 ml-1">{label}</label>
            <select disabled={isDisabled} className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full" 
            id={label}
            value={value}
            onChange={onChange}
            >
                {option.map((option)=>(
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}

            </select>
        </div>
    )
}