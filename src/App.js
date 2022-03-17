import faker from '@faker-js/faker';//영문 버전의 faker.js
import faker_ko from '@faker-js/faker/locale/ko' // 한글 버전의 faker.js
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './App.css';




function App() {
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

  const userCards = userDatas.map((userData, idx) => {
    return <Card sx={{ maxWidth: 345 }} key={idx}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={userData.avatar}
        alt={userData.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {userData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userData.jobTitle}<br/>
          {userData.email}<br/>
          {userData.phoneNo}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
    
    
  //   <div key={idx}>
  //   <h4>{ userData.jobTitle }</h4>
  //   <img src={ userData.avatar }alt="사용자 프로필용 아바타"></img>
  //   <h5>{ userData.name }</h5>
  //   { userData.email }<br />
  //   { userData.phoneNo }
  // </div>
  })

  return (
    <div className="App">
      {userCards}
    </div>
  );
}

export default App;
