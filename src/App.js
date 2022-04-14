import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { makeUserDatas } from './Utils';
import UserCardList from './components/UserCardList';
import WeatherCard from './components/WeatherCard';

import Grid from '@mui/material/Grid';

const userDatas = makeUserDatas(1004);

function App() {
  const [useDarkMode, setUseDarkMode] = useState(true);

  const handleChange = (event) => {
    setUseDarkMode(event.target.checked);
  };

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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((no) => (
              <WeatherCard id={no} />
            ))}
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
