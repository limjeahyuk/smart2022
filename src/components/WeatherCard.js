import { Typography } from '@mui/material';
import { weather_mapping_data, cityLatLon } from '../dataset/WeatherData';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function WeatherCard(props) {
  const { id } = props;
  const defaultCityName = localStorage.getItem(id + '_city') || '안양';
  const [weatherData, setWeatherData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [selectedCityData, setSelectedCityData] = useState(
    cityLatLon.find((data) => data.name === defaultCityName),
  );
  const selectHandleChange = (event) => {
    const cityname = event.target.value;
    const findCityName = cityLatLon.find((data) => data.name === cityname);
    setSelectedCityData(findCityName);
    localStorage.setItem(id + '_city', findCityName.name);
  };

  useEffect(() => {
    //현재 시간 - 로컬스토리지에 저장한 시간 = 로컬스토리지에 저장한 시간으로부터 흘러간 시간이 나옴
    // 흘러간 시간이 10분 미만이면 로컬스토리지에 저장한 날씨 데이터를 활용
    // 흘러간 시간이 10분 이상이면 openApi를 호출.
    const cityName = selectedCityData.name;
    const cityGetDate = cityName + '_저장시간';
    if ((Date.now() - localStorage.getItem(cityGetDate)) / 1000 / 60 > 60) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCityData.lat}&lon=${selectedCityData.lon}&lang=kr&units=metric&&appid=db07f8319467878d8d2ee4c5d2b038b4`,
        )
        .then((res) => {
          setWeatherData(res.data);
          localStorage.setItem(cityName, JSON.stringify(res.data));
          localStorage.setItem(cityGetDate, Date.now());
        })
        .catch((error) => {
          setApiError(error);
        });
    } else {
      setWeatherData(JSON.parse(localStorage.getItem(cityName)));
    }
  }, [selectedCityData]);

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
        <FormControl>
          <InputLabel id="selected-city-label">도시</InputLabel>
          <Select
            labelId="selected-city-label"
            id="selectd-city"
            value={selectedCityData.name}
            label="도시"
            onChange={selectHandleChange}
          >
            {cityLatLon.map((city) => (
              <MenuItem value={city.name}>{city.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
