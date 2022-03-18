import faker from '@faker-js/faker';//영문 버전의 faker.js
import faker_ko from '@faker-js/faker/locale/ko' // 한글 버전의 faker.js
import UserCard from './components/UserCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const userDatas = [];

while(userDatas.length < 5){
  userDatas.push({
    avatar: faker.image.avatar(),
    name: `${faker_ko.name.lastName()}${faker_ko.name.firstName()}`,
    email: faker.internet.email(),
    jobTitle: faker.name.jobTitle(),
    phoneNo: faker.phone.phoneNumber()
  }
)
}

function App() {
  const userCards = userDatas.map((userData, idx) => {
    return <Grid key={idx}>
    <UserCard userData={userData}/>
  </Grid>
    
  })

  return (
    <Container maxWidth="lg" sx={{p:1}}>
      <Grid container spacing={{xs:2,md:3}} columns={{xs:4,sm:8,md:12}}>
        <Grid item xs={2} sm={2} md={2} key={1}>
          <UserCard userData={userDatas[0]} />
        </Grid>
        <Grid item xs={2} sm={4} md={6} key={2}>
          <UserCard userData={userDatas[1]} />
        </Grid>
        <Grid item xs={2} sm={2} md={4} key={3}>
          <UserCard userData={userDatas[2]} />
        </Grid>
      </Grid>
     </Container>
  );
}

export default App;
