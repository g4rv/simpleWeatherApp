type CustomRangeProps = {
	maxRange?: number;
	minRange?: number;
	rangeValue: number;
	className?: string;
};

const CustomRange: React.FC<CustomRangeProps> = ({
	maxRange = 10,
	minRange = 1,
	rangeValue,
	className = '',
}) => {
	const dotPosition = (100 / (maxRange - minRange)) * (rangeValue - minRange);
	return (
		<div className={`${className}`}>
			<div className="relative h-[5px] w-full rounded-full bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500">
				<div
					className="absolute bottom-0 top-0 my-auto box-content h-[5px] w-[5px] rounded-full border border-black bg-white"
					style={{ left: `${dotPosition}%`, translate: '-50% 0' }}
				></div>
			</div>
		</div>
	);
};
export default CustomRange;
