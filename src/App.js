import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { makeUserDatas } from './Utils';
import UserCardList from './components/UserCardList';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const userDatas = makeUserDatas(1004);
console.log(1);

function App() {
  const [useDarkMode, setUseDarkMode] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleChange = (event) => {
    setUseDarkMode(event.target.checked);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        const result = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?lat=37.3943&lon=126.9568&lang=kr&units=metric&&appid=db07f8319467878d8d2ee4c5d2b038b4',
        );
        setWeatherData(result.data);
      } catch (err) {
        setApiError(err);
      }
    };
    callApi();
    console.log('component did mount');
  }, []);

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
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 1,
        }}
      >
        <WeatherCard weatherData={weatherData} apiError={apiError} />
      </Box>
      <Box
        sx={{
          height: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 1,
        }}
      >
        <Switch
          checked={useDarkMode}
          onChange={handleChange}
          color="warning"
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Container maxWidth="lg" sx={{ p: 1 }}>
          <UserCardList userDatas={userDatas} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
