import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { makeUserDatas } from './Utils';
import UserCardList from './components/UserCardList';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import { cityLatLon } from './dataset/WeatherData';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const userDatas = makeUserDatas(1004);

function App() {
  const [useDarkMode, setUseDarkMode] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [selectedCityData, setSelectedCityData] = useState({
    name: '안양',
    lat: 37.3943,
    lon: 126.9568,
  });

  const handleChange = (event) => {
    setUseDarkMode(event.target.checked);
  };

  const selectHandleChange = (event) => {
    const cityname = event.target.value;
    const findCityName = cityLatLon.find((data) => data.name === cityname);
    setSelectedCityData(findCityName);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const callApi = async () => {
      try {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCityData.lat}&lon=${selectedCityData.lon}&lang=kr&units=metric&&appid=db07f8319467878d8d2ee4c5d2b038b4`,
        );
        setWeatherData(result.data);
      } catch (err) {
        setApiError(err);
      }
    };
    console.log(2);
    callApi();
    console.log('component did mount');
  }, [selectedCityData]);

  useEffect(() => {
    console.log(`theme 변경된 -> ${useDarkMode}`);
  }, [useDarkMode]);

  console.log('render');
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: useDarkMode ? 'dark' : 'light',
        },
      })}
    >
      <Box
        sx={{
          minHeight: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 1,
        }}
      >
        <Container maxWidth="lg">
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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <WeatherCard weatherData={weatherData} apiError={apiError} />
            <WeatherCard weatherData={weatherData} apiError={apiError} />
            <WeatherCard weatherData={weatherData} apiError={apiError} />
          </Grid>

          <Switch
            checked={useDarkMode}
            onChange={handleChange}
            color="warning"
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <UserCardList userDatas={userDatas} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
