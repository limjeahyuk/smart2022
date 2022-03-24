import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { makeUserDatas } from './Utils';
import UserCardList from './components/UserCardList';

const userDatas = makeUserDatas(1004);

function App() {
  const [useDarkMode, setUseDarkMode] = useState(true);

  const handleChange = (event) => {
    setUseDarkMode(event.target.checked);
  };

  useEffect(() => {
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
