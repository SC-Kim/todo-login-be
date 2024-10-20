const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
console.log("mongouri", MONGODB_URI_PROD)
app.use(bodyParser.json())
app.use('/api', indexRouter)

const mongoURI = MONGODB_URI_PROD

mongoose.connect(mongoURI, {useNewUrlParser:true}).then(() => {
    console.log("mongoose connected!!")
}).catch((err)=>{
    console.log("DB connection fail", err)
})

app.listen(process.env.PORT || 5002, ()=>{      // 5002(with Atlas DB, local), 5001(local DB, local), 
    console.log("server on 5002")
})

// 1. 회원가입
// 2. 유저가 이메일, 패스워드, 유저이름, 입력해서 보냄
//      받은 정도를 저장함 (데이터 베이스 모델 필요)
//      패스워스 암호화 시켜서 저장 

// 라우터
// 데이터 모델
// 데이터 저장 (이미 가입된 사용자 유무 확인, 패스워드 암호화 반드시)
// 응답 보낸다. 

// 로그인
// 이메일 패스워드 프론트에서 입력해서 보냄
// DB에 해당 이메일과 패스워드 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있다면? 유저정보 + 토큰 
// 토큰 활용해 재로그인 없이 서비스 이용 가능
// 프론트엔드에서는 토큰 정보 저장 필요
// 라우터 설정
// 이메일 패스워드 정보 읽어오기 
// 이메일을 가지고 유저정보 가져온다
// 이 유저의 DB 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
// 맞으면 토큰 발행하고, 틀리면 에러 메시지 보냄





