import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
import { paginate } from '../Utils';
import { useState } from 'react';

function UserCardList(props) {
  const pageContentsCount = 9;
  const [pageNo, setPageNo] = useState(1);
  const [currentUserDatas, setCurrentUserData] = useState(
    paginate(props.userDatas, pageContentsCount, pageNo),
  );

  const handleChangePageNo = (event, value) => {
    setPageNo(value);
    setCurrentUserData(paginate(props.userDatas, pageContentsCount, value));
  };

  const userCards = currentUserDatas.map((userData, idx) => {
    return (
      <Grid item xs={2} md={4} key={idx}>
        <UserCard userData={userData} idx={idx} />
      </Grid>
    );
  });

  return [
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {userCards}
    </Grid>,
    <Pagination
      count={Math.ceil(props.userDatas.length / pageContentsCount)}
      page={pageNo}
      onChange={handleChangePageNo}
      color="secondary"
    />,
  ];
}

export default UserCardList;
