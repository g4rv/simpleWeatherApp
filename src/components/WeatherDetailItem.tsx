import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type WeatherDetailItemProps = {
    className?: string;
    icon?: string;
    title?: string;
    children?: ReactNode;
}

const WeatherDetailItem: React.FC<WeatherDetailItemProps> = ({children, title, className = ''}) => {
    return (
        <div className={twMerge(`relative pt-6 px-4 pb-3 bg-purple-950/40 border border-[rgba(255,255,255,0.20)] rounded-xl`, className.length > 0 && className)}>
            <h3 className="absolute top-2 left-4 font-semibold text-xs uppercase opacity-70 ">{title}</h3>
            {children}
        </div>
    );
};
export default WeatherDetailItem;