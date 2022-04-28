.env
DB_HOST=RDS HOST
DB_PASSWORD=RDS PASSWORD

package.json

1. npm start => production으로 연동되서 RDS로 연결

RDS의 database를 drop하고 create하려면 config.js 에서
config.js -> development -> password랑 host내용을 process.env.DB_PASSWORD, process.env.DB_HOST 로 바꾸고 해야함.
안그러면 localDB만 drop, create됨.
production에서는 sequelize가 안먹음.

2. npm run dev => development으로 연동되서 LocalDB로 연결
   킬때만 켜지고 끄면 꺼짐
