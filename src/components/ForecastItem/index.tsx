import React from "react";

type ForecastProps = {
    date: string,
    condition: string,
    temp: number
}

const ForecastItem: React.FC<ForecastProps> = ({date, condition, temp}) => {
    return (
        <div className="flex flex-col items-center gap-3 py-4 px-2 bg-slate-400 rounded-full">
            <h2 className="text-sm font-semibold">{date}</h2>
            <img src={condition} className="w-12"/>
            <p className="">{temp}&deg;</p>
        </div>
    );
};
export default ForecastItem;