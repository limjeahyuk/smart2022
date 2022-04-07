import { Typography } from '@mui/material';
import { weather_mapping_data } from '../dataset/WeatherData';
import Grid from '@mui/material/Grid';

function WeatherCard(props) {
  console.log(props);
  const { weatherData, apiError } = props;

  const makeWeatherInfo = () => {
    const { temp, feels_like, temp_max, temp_min, humidity } = weatherData.main;
    const { main, icon } = weatherData.weather[0];
    // weather_mapping_data[main]
    // weather_mapping_data.Clear
    const parseWeatherData = weather_mapping_data[main]
      ? weather_mapping_data[main]
      : weather_mapping_data['Etc'];

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
      <Grid item xs={1} sm={2} md={4}>
        <Typography>{`현재날씨: ${parseWeatherData.name}`}</Typography>
        <parseWeatherData.icon sx={{ fontSize: 125, color: 'yellow' }} />
        <img src={iconUrl} alt="현재날씨 아이콘" />
        <Typography>{`현재온도: ${temp}℃ 체감온도: ${feels_like}℃`}</Typography>
        <Typography>
          {`최저기온: ${temp_min}℃ 최고기온: ${temp_max}℃ 습도: ${humidity}%`}
        </Typography>
      </Grid>
    );
  };

  return (
    <>
      {apiError ? (
        <Typography>{apiError.message}</Typography>
      ) : weatherData ? (
        makeWeatherInfo()
      ) : (
        <Typography>날씨 정보 없음.</Typography>
      )}
    </>
  );
}

export default WeatherCard;
