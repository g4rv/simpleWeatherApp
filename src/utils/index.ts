import { UnitsType } from '@/types/settings';

const getDayName = (
	date = new Date(),
	locale = 'en-US',
	length: 'long' | 'short' = 'short'
) => {
	return date.toLocaleDateString(locale, { weekday: length });
};

export const formatDate = (
	date: string,
	type: UnitsType = 'metric'
): string | 'Now' => {
	const [dateString, hourString] = date.split(' ');
	const currentDateTime = new Date();

	if (hourString) {
		const currentHours = currentDateTime.getHours();
		let hourNumber = Number(hourString.split(':')[0]);

		if (currentHours === hourNumber) return 'Now';

		if (type === 'imperial') {
			const amOrPm = hourNumber >= 12 ? 'pm' : 'am';
			hourNumber = hourNumber % 12 || 12;

			return String(hourNumber) + amOrPm;
		}

		const isOneDigitHour = hourNumber < 10;
		return isOneDigitHour
			? '0' + String(hourNumber) + ':00'
			: String(hourNumber) + ':00';
	}

	return getDayName(new Date(dateString));
};
