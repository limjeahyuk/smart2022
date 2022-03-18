import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



function UserCard(props) {
    const { userData, idx } = props;

    return <div key={idx}>
    <Card sx={{ maxWidth: 345 }}>
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
  </div>;

}

export default UserCard;
