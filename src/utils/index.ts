import { UnitsType } from '@/redux/settingsSlice/types';

export const formatHours = (time: string, units: UnitsType) => {
	const locale = units === 'metric' ? 'en-UK' : 'en-US';
    const hoursRegExp = new RegExp(/\d{1,2}:\d{1,2}/)

    if(!hoursRegExp.test(time)) {
        console.error('Something went wrong during hour formatting! Please check out your function call!')
        return 'error'
    }

    const fullDateTimeInfo = new Date(`2000-01-01 ${time}`)
    const localeTime = fullDateTimeInfo.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric'
    });

    return localeTime
}

export const formatDateTime = (
	dateTime: string,
	units: UnitsType = 'metric'
) => {
	const locale = units === 'metric' ? 'en-UK' : 'en-US';

	const fullDate = new Date(dateTime);
    const currentDateTime = new Date();

    const hoursRegExp = new RegExp(/\d{1,2}:\d{1,2}/)
    const dateHasHours = hoursRegExp.exec(dateTime)

    if(dateHasHours) {
        const formatedHour = fullDate.toLocaleTimeString(locale, {
            hour: 'numeric',
        });
		const currentFormatedHour = currentDateTime.toLocaleTimeString(locale, {
			hour: 'numeric',
		});

		if (formatedHour === currentFormatedHour) return 'Now';

		return units === 'metric'
			? formatedHour + ':00'
			: formatedHour.split(' ').join('');
    }

	const formatedDate = fullDate.toLocaleDateString(locale, {
		weekday: 'short',
	});
	// const currentFormatedDate = currentDateTime.toLocaleDateString(locale, {weekday: 'short'})

	// if(formatedDate === currentFormatedDate) return 'Now'

	return formatedDate;
};

export const getAirQualityResult = (
	index: number,
	unitsType: UnitsType
) => {
	if (unitsType === 'metric') {
		switch (true) {
			case index >= 1 || index <= 3:
				return 'low health risk';
			case index >= 4 || index <= 6:
				return 'moderate health risk';
			case index >= 7 || index <= 9:
				return 'high health risk';
			case index === 10:
				return 'very high health risk';
		}
	}

	if (unitsType === 'imperial') {
		switch (index) {
			case 1:
				return 'good';
			case 2:
				return 'moderate';
			case 3:
				return 'unhealthy for sensitive group';
			case 4:
				return 'unhealthy';
			case 5:
				return 'very unhealthy';
			case 6:
				return 'hazardous';
		}
	}

    return 'undefined'
};

export const getUvResult = (index: number) => {
    switch (true) {
        case index >= 1 || index <= 3:
            return 'low';
        case index >= 4 || index <= 6:
            return 'moderate';
        case index >= 7 || index <= 9:
            return 'high';
        case index === 10:
            return 'very high';
        case index >= 11:
            return 'extreme';
    }

    return 'undefined'
}
