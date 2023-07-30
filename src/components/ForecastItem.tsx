type ForecastItemProps = {
	time: string;
	conditionImg: string;
	conditionText: string;
	temp: number;
};

const ForecastItem: React.FC<ForecastItemProps> = ({
	time,
	conditionImg,
	conditionText,
	temp,
}) => {
	return (
		<div className="flex flex-col items-center gap-2 rounded-full bg-purple-900/40 shadow-[5px_4px_10px_0px_rgba(0,0,0,0.25)] shadow-inner-[1px_1px_0px_0px_rgba(255,255,255,0.25)_inset] border border-[rgba(255,255,255,0.20)] px-2 py-4">
			<p className="text-base font-semibold uppercase">{time}</p>
			<img src={conditionImg} alt={conditionText} className="w-12"/>
			<p className="text-lg font-semibold">{temp}&deg;</p>
		</div>
	);
};

export default ForecastItem;
