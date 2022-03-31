import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function WeatherCard(props) {
  console.log(props);
  const { weatherData, apiError } = props;

  return (
    <>
      {apiError ? (
        <Typography>{apiError.message}</Typography>
      ) : weatherData ? (
        <Box>
          <Typography>{`현재날씨: ${weatherData.weather[0].main}`}</Typography>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="현재날씨 아이콘"
          />
          <Typography>
            {`현재온도: ${weatherData.main.temp}℃ 체감온도: ${weatherData.main.feels_like}℃`}
          </Typography>
          <Typography>
            {`최저기온: ${weatherData.main.temp_min}℃ 최고기온: ${weatherData.main.temp_max}℃ 습도: ${weatherData.main.humidity}%`}
          </Typography>
        </Box>
      ) : (
        <Typography>날씨 정보 없음.</Typography>
      )}
    </>
  );
}

export default WeatherCard;
