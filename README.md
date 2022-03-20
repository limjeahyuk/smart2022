# 03.10
```javascript
function add(a,b){
return a+b;
}

const add = (a,b) => {
return a+b;
}

const add = (a,b) => a+b;
```
위 3가지 다 같은 뜻

<hr>

## map 함수

map 함수는 return 필수 <br>
foreach 함수는 return 없어도 괜찮습니다.

```javascript
const testData = [
  {
    text: "누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. ",
    imgUrl: "https://img.insight.co.kr/static/2020/09/22/700/97so3hz72p4nq982if5l.jpg"
  },
  {
    text: "누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. ",
    imgUrl: "https://img.insight.co.kr/static/2020/09/22/700/97so3hz72p4nq982if5l.jpg"
  },
  {
    text: "국무총리는 국회의 동의를 얻어 대통령이 임명한다. ",
    imgUrl: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png"
  },
  {
    text: "재산권의 행사는 공공복리에 적합하도록 하여야 한다.",
    imgUrl: "http://image.auction.co.kr/itemimage/14/97/95/1497951b06.jpg"
  }
]

 {testData.map((contents)=>{
            return <div>
              <img src={faker.image.avatar()} alt="fake 사진"/>
              {contents.text}
              <img src={faker.image.cats()} alt="fake 사진"/>
              </div>
          })}
```

map 함수는 안에 있는 내용물 만큼 반복해서 넣어줍니다.

<hr>

## faker

```javascript
npm install @faker-js/faker --save-dev

import { faker } from '@faker-js/faker';
```

아무 이미지나 넣고 테스트할때 필요한 npm 패키지 중 하나.

<hr>

## JSX
- JSX는 javascript를 확장한 문법.
- react는 jsx 사용이 필수는 아니지만, <br>javascript 코드안에서 ui관련 작업을 할때 시각적으로 더 도움이 됨.
- jsx는 html보다는 javascript에 가깝기 때문에 프로퍼티 명명 규칙을 사용.
    > jsx에서 class > className / tabindex > tabIndex

<hr>

# 03-17
## Return 반환
```javascript
1
return <div> test </div>
		<div> test</div>
=========================
2
return <div>
		<div>test</div>
		<div>test</div>
	    </div>
```
- return은 한 덩어리만 받을 수 있다. 그렇기 때문에 1번은 오류가 나고
2번은 오류가 나지 않습니다.

## Script 분리
```javascript
import { faker } from '@faker-js/faker';
import logo from './image.jpg';

const testData = [
  {
    text: "누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. ",
    imgUrl: "https://img.insight.co.kr/static/2020/09/22/700/97so3hz72p4nq982if5l.jpg"
  },
  {
    text: "국무총리는 국회의 동의를 얻어 대통령이 임명한다. ",
    imgUrl: "https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png"
  },
  {
    text: "재산권의 행사는 공공복리에 적합하도록 하여야 한다.",
    imgUrl: "http://image.auction.co.kr/itemimage/14/97/95/1497951b06.jpg"
  }
]

function DogMain(props) {
  const h1Element = <h1>{props.title}</h1>
  const imgElement = <img src={logo} className="App-logo" alt="logo" />
  
  return (
    <> 
        {h1Element}
        {imgElement}
        <p>
          짱구 귀여워 5가닥<code>src/App.js</code> and save to reload.
        </p>
        {testData.map((contents)=>{
            return <div>
              <img src={faker.image.avatar()} alt="fake 사진"/>
              {contents.text}
              <img src={faker.image.cats()} alt="fake 사진"/>
              </div>
        })}  
    </>
  );
}

export default DogMain;
```

App.js에서 content 부분을 가지고 새로운 js를 만들었습니다.
```javascript
import DogMain from './DogMain';

<DogMain />
```
> App.js에 위 코드를 넣음으로써 원하는 위치에 DogMain.js를 유동적으로 넣을 수 있습니다.
 > App.js이 덜 복잡해지고 보기 편하며 여러 개 복사하더라도 코드가 복잡해지지 않습니다.

## Props
```javascipt
<DogMain title="짱구입니다."/>
<DogMain title="짱아입니다1."/>
<DogMain title="아기짱구입니다."/>
<DogMain title="흰둥이입니다.2"/>
<DogMain title="짱구가 최고입니다.3"/>
<DogMain title="짱구왕 귀엽습니다.4"/>


function DogMain(props) {
  const h1Element = <h1>{props.title}</h1>
```

props는 부모 컨포넌트가 자식 컴포넌트에 값을 전달할 때 사용하는 것.<br>
h1 Element에 App.js에서 적은 title들을 저장합니다.<br>

## Faker
```javascript
import faker from '@faker-js/faker';//영문 버전의 faker.js
import faker_ko from '@faker-js/faker/locale/ko' // 한글 버전의 faker.js
```
faker 사용할때 import를 이름만 다르게 두 개 해줌으로써<br>
한글 버전과 영문 버전 두 가지로 나눠서 받아올 수 있다.

## Const
```javascript
const userData = {
    avatar: faker.image.avatar(),
    name: `${faker_ko.name.lastName()}${faker_ko.name.firstName()}`,
    email: faker.internet.email(),
    jobTitle: faker.name.jobTitle(),
    phoneNo: faker.phone.phoneNumber()
  }
  ```
faker data를 userData에 넣을 때 const를 사용해서 저장합니다.<Br>
https://github.com/faker-js/faker에서 faker.js 패키지의 API를 확인 가능합니다.<br>
faker는 영문이 기본이기 때문에 한국 이름 저장 시 faker_ko를 이용해 lastName을 받고 firstName을 받아야 한다.<br>
```javascript
name : ` @@ ` , 문자열 두 개를 가져와 합칠 때는 작은 따옴표 ' 가 아닌 `를 사용해야 합니다. 
```
사용 시에는 {user.jobTitle} 이런 식으로 사용 가능. <hr>
## Datas
```javascript
while(userDatas.length < 5){
    userDatas.push({
      avatar: faker.image.avatar(),
      name: `${faker_ko.name.lastName()}${faker_ko.name.firstName()}`,
      email: faker.internet.email(),
      jobTitle: faker.name.jobTitle(),
      phoneNo: faker.phone.phoneNumber()
    })
  }
  ```
 - 여러 가지 data들을 넣고 싶을 때는 while(반복) 문과 push를 사용하여 data들을 userDatas에 저장해준다.

```javascript
const userCards = userDatas.map((userData) => {
    return <>
    <h4>{ userData.jobTitle }</h4>
    <img src={ userData.avatar }alt="사용자 프로필용 아바타"></img>
    <h5>{ userData.name }</h5>
    { userData.email }<br />
    { userData.phoneNo }
  </>
  })
  ```
map() 함수는 각 배열의 요소를 돌면서 인자로 전달된 함수를 사용하여<br>
새로운 결과를 새로운 배열에 담아 반환하는 함수입니다.<Br>
map 함수를 통해서 datas에 저장된 data들을 차례로 넣어준다.<Br>
<hr>

## Key
map() 함수는 key값을 지정해주지 않으면 오류가 납니다. <Br>
key 값은 언제나 유일한 값이어야만 합니다. 기본적으로 map() 함수 내부에 인덱스가 있습니다.

```js
map(element)
map(element, index)
map(element, index, array)
userDatas.map((userData, idx) => {
  ```
이런 식으로 사용하여 key값을 지정해줄 수 있습니다.
단, 그리 좋은 방법은 아닙니다.<hr>

## mui
리액트 기반 ui 라이브러리를 사용함으로써 좀 더 쉽고 편하게 이쁘고 원하는 모양으로 디자인을 할 수 있습니다.

https://mui.com/getting-started/installation/

npm, svg icon을 install 해준다.
font는 index.html에 <link> 해준다.
```js
const { userData } = props;

const userData = props.userData;

==================================

const { userData, idx } = props;

const userData = props.userData;
const idx = props.idx;
```

밑에 문장을 {괄호} 사용을 통해 위 문장처럼 짧고 보기 좋게 바꿀 수 있습니다.

```js
return <UserCard userData={userData} idx={idx} />
```

UserCard.js 에서 props를 통해 userData와 idx를 받아와 App.js에서 리턴 받아 올 수 있습니다.
<hr>

## grid 컨테이너
사용하기 위해서 
```js
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
```

App.js 에 import 해줍니다.

```js
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {Array.from(Array(6)).map((_, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Item>xs=2</Item>
    </Grid>
  ))}
</Grid>
```
mui container에서 제공하는 grid는 반응형 레이아웃으로 화면 크기에 맞춰서 item이 조정됩니다.<br>
크기는 xs / sm / md / lg / xl 순으로 있으며<br>
xs => 0px ( extra-small )<br>
sm => 600px ( small )<br>
md => 900px ( medium )<br>
lg => 1200px ( large )<br>
xl => 1536px ( extra-large) 로 이루어져 있다.<br>
<br>
위 코드를 보며 설명 하자면,<Br>
spacing은 item들 사이의 여백으로써 xs일 때는 2만큼의 여백, md일 때는 3만큼의 여백이 있다.<Br>
columns는 한 줄에 1 크기의 item이 몇 개 들어가는지 알려준다.<br>
xs일 때는 1 크기의 아이템이 4개, sm일 때는 8개, md일 때는 12개이다.<Br>
item은 xs일 때 2만큼의 크기를 가지게 되고, sm일 때 4, md일 때 4를 가지게 된다.<br>
이렇게 되면 xs일 때는 한 줄에 2개씩 있으며 3줄로 나오게 된다.<br>
sm 일때는 한줄에 2개씩 3줄<Br>
md일 때는 한줄에 3개씩 2줄이 나오게 된다.


<hr>

## 결과창
xs, sm / md
추가로...
```js
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
  ```
위와 같이 item들 마다 값을 다 다르게 줄 수도 있다.