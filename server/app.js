const express = require('express')
const app = express();
const port = 5000;
const session = require('express-session'); // 세션 설정
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const passport = require('passport');
//const passportConfig = require('./passport');


const mongoose = require("mongoose");
const config = require("./config/key");

const connect = mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
//app.use(passport.initialize()); // passport 구동
//app.use(passport.session()); // 세션 연결
//passportConfig(); // 이 부분 추가
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


//app.use('/api', require('./routes/home'));
app.use('/api/user', require('./routes/user'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`))