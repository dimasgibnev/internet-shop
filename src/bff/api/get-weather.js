export const getWeather = async () => {
	const tempData = await fetch(
		'https://api.openweathermap.org/data/2.5/weather?lat=56.155635&lon=84.938230&units=metric&lang=ru&appid=e70a2489bbf0858344b62e1da5282e87',
	).then((rowData) => rowData.json())
	;

	return {
		temp: tempData.main.temp,
		desc: tempData.weather[0].description
	}
};
