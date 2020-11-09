// 기본 모듈
const express = require('express');
const http = require('http');
const https = require('https');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const fs = require('fs');
const path = require('path');
const Url = require('url');

// 설정 파일
const setting = require('./setting.json');

// app 정의
const app = express();

// SSL 관련 설정
let options;
if(setting.USE_SSL) {
    options = {
        cert: fs.readFileSync(setting.SSL_CERT),
        key: fs.readFileSync(setting.SSL_KEY)
    }
}

// 세션, REDIS
let sessionMiddleware;
if(setting.USE_REDIS) {
    const client = redis.createClient({
        host: setting.REDIS_HOST,
        port: setting.REDIS_PORT,
        password: setting.REDIS_PASSWORD,
        logError: true
    });
    sessionMiddleware = session({
        secret: setting.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: client }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
    app.use(sessionMiddleware);
}
else {
    sessionMiddleware = session({
        secret: setting.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    });
    app.use(sessionMiddleware);
}

// 쿠키 파서
app.use(cookieParser());

// Flash 설정
app.use(flash());

// 정적 파일 제공
const staticoptions = {
    index: setting.INDEX
}
app.use(express.static(__dirname + "/public/", staticoptions));

// view engine을 EJS로 설정
app.set('views', './views');
app.set('view engine', 'ejs');

// IE 경고
app.use((req, res, next) => {
    if(/trident|msie/gi.test(req.get('User-Agent'))) {
        req.flash('Warn', 'IE는 정상 작동을 보장하지 않습니다. <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.mozilla.org/ko-KR/firefox/new/">FireFox</a>, <a href="https://whale.naver.com/ko/download">Whale</a> 등의 최신 브라우저를 이용해주세요.');
    }
    next();
});

// 미리 템플릿 엔진 변수 넣기
app.use((req, res, next) => {
    res.locals.servername = setting.SERVER_NAME;
    res.locals.Error = req.flash('Error');
    res.locals.Info = req.flash('Info');
    res.locals.Warn = req.flash('Warn');
    res.locals.session = req.session;
    res.locals.query = req.query;
    res.locals.referrer = req.get('referrer');
    res.locals.referrer_path = req.get('referrer') != null ? Url.parse(req.get('referrer')).path : req.url;
    next();
});

// 라우터 불러오기
console.log('라우터를 불러오는 중...');
fs.readdirSync('./routes').forEach((file) => {
    app.use(require(`./routes/${file}`));
    console.log(`${file} 라우터를 불러왔습니다.`);
});
console.log('라우터를 모두 불러왔습니다.\n');

// 서버 구동
let server;
if(setting.USE_SSL) {
    server = https.createServer(options, app).listen(setting.PORT, () => {
        console.log('보안 서버가 구동중입니다!');
    });
}
else {
    server = http.createServer(app).listen(setting.PORT, () => {
        console.log("서버가 구동중입니다!");
    });
}