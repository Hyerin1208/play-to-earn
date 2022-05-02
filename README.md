
# 프로젝트 작명소 팀

### 팀장 : 박성근 <a href="https://github.com/Mr-butter"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></a>
### 팀원 : 김혜린 <a href="https://github.com/Hyerin1208"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></a> <a href="https://plastic-yuzu-23a.notion.site/P2E-f7e3bc28fe3d4a919c706bdeecc407fe"><img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/></a> , 이성현 <a href="https://github.com/coolmarvel"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></a> <a href="https://saranghaeo.tistory.com/"><img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/></a>
---------------------------------------

### 프로젝트 기간 : 2022-03-07 ~ 2022-05-01 (총 55일)

### 개요
Binance Smart Chain 기반의 특정 NFT 홀더들만 참여할 수 있는 게임 플랫폼 개발,
게임 참여자들이 Token을 보상으로 얻을 수 있는 시스템 구현 (P2E)

### 목적
NFT 참여 GAME 플랫폼 제작
1. 특정 NFT 홀더만 참여가능
2. 주간 순위 기반으로 토큰을 얻을 수 있는 대상자 지갑 선정
3. 대상자 지갑이 Claim해서 직접 Token을 얻어갈 수 있도록 설정

### 미션가이드  <a href="https://docs.google.com/document/d/108cG27YZFRMUc1oHWL6x_Ov6VffYk6qH/edit?usp=sharing&ouid=106272728987475253657&rtpof=true&sd=true"><img src="https://img.shields.io/badge/Google Drive-4285F4?style=flat-square&logo=Google Drive&logoColor=white"/></a>

### 사용기술 요약
- ERC-721 (NFT) Mint, BEP-20 Token
- NFT 보유여부 확인 : 지갑연결, Web3 통신 (BalanceOf 함수 활용)
- 게임 개발 오픈소스 활용 & 게임 승리에 따른 보상 지급

#### 추가기능
- Token Staking (AAT 토큰 스테이킹)
- NFT 카드 옵션변경 (게임 점수 추가 획득)


### 개발환경
React, Redux
Node.js, MySQL,
Solidity,
IPFS, Ganache Truffle
aws RDS, EC2, S3


### 페이지 별 프로젝트 내 사용 기술

|      페이지      | 구현 기능 |
--------|------------
회원 가입  | 회원정보등록 , 기본 NFT 선택, 회원정보수정 , 로그인/작성자 본인 여부 등에 따라 접근 권한 설정 , redux로 회원정보 state관리 , 회원가입/로그인 중복 방지 , 유효성 검사
NFT 생성 | NFT 컨트렉트 접속 권한 확인, NFT정보입력, 생성, 소유자 등록 및 db등록
NFT 마켓 | 판매하고 있는 NFT 선택, AAT사용구매/판매, 소유자 변경
게임 | NFT보유 여부 및 회원확인, 게임 접속, 랭킹확인, 보상정보
NFT 진화 | 보유하고 있는 NFT 선택, 옵션변경(AAT사용), 게임점수 추가 획득
CMS페이지 | 주차별 ranking 관리 및 스테이킹 관리 - claim 권한부여
스테이킹 | staking 및 500AAT이상 예치시 1%보상, 토큰 컨트랙트, 스테이킹 컨트랙트 보상토큰 전송, 보상관련 info chart 

---------------------------------------
## Naming Center site
http://play-to-earn.s3-website.ap-northeast-2.amazonaws.com/
---------------------------------------

### 프로젝트 팀 구성 및 역할
#### 박성근 (팀장)
Contract : NFT, AAT, Claim, Staking
Front : Client base 작성, Contract 기능 연결
Back : Server base 작성, DB base 작성

#### 김혜린
Contract : 상세 기능에 관한 설계
Front :  설계, 각 컴포넌트 및 디자인 작성
Back : Server 및 DB 구조 설계,  DB 작성

#### 이성현
Contract : 상세 기능에 관한 설계
Front :  게임 관련 컴포넌트 작성 / 기능 테스트
Back : Server 개발, 게임 DB 작성, AWS 배포

> **사용 모듈 (server)**

"body-parser": "^1.19.2", "cookie-parser": "~1.4.4", "cors": "^2.8.5", "cross-env": "^7.0.3", "debug": "~2.6.9", "dotenv": "^16.0.0", "express": "~4.16.1", "http-errors": "~1.6.3", "http-proxy-middleware": "^2.0.4", "morgan": "~1.9.1", "multer": "^1.4.4", "mysql2": "^2.3.3", "sequelize": "^6.17.0", "sequelize-cli": "^6.4.1", "uuid": "^8.3.2"

> **사용 모듈 (client)**

"@binance-chain/javascript-sdk": "^4.2.0", "@binance-chain/wallet": "^0.11.2", "@coinbase/wallet-sdk": "^3.0.8", "@emailjs/browser": "^3.6.2", "@emotion/react": "^11.8.2", "@iconscout/react-unicons": "^1.1.6", "@metamask/onboarding": "^1.0.1", "@testing-library/jest-dom": "^5.16.2", "@testing-library/react": "^12.1.3", "@testing-library/user-event": "^13.5.0", "@visx/visx": "^2.9.0", "@walletconnect/web3-provider": "^1.7.7", "animate.css": "^4.1.1", "apexcharts": "^3.35.0", "axios": "^0.26.1", "bootstrap": "^5.1.3", "chart.js": "^3.7.1", "core-js": "^3.11.1", "dat.gui": "^0.7.9", "drei": "^2.2.21", "ethers": "^5.6.2", "framer-motion": "^4.1.17", "html-loader": "^1.3.2", "http-proxy-middleware": "^2.0.4", "ipfs-http-client": "^56.0.1", "js-cookie": "^3.0.1", "lodash": "^4.17.21", "mainloop.js": "^1.0.4", "path": "^0.12.7", "react": "^17.0.2", "react-apexcharts": "^1.4.0", "react-beautiful-dnd": "^13.1.0", "react-bootstrap": "^2.2.2", "react-chartjs-2": "^4.0.1", "react-circular-progressbar": "^2.0.4", "react-cookie": "^4.1.1", "react-dom": "^17.0.2", "react-draggable": "^4.4.4", "react-elastic-carousel": "^0.11.5", "react-fade-in": "^2.0.1", "react-helmet": "^6.1.0", "react-icons": "^4.3.1", "react-is": "^18.1.0", "react-loading": "^2.0.3", "react-redux": "^7.2.6", "react-responsive-carousel": "^3.2.23", "react-router-dom": "^6.2.2", "react-scripts": "5.0.0", "react-scroll-to-top": "^1.0.8", "react-simple-animate": "^3.3.12", "react-slick": "^0.28.1", "react-spinners": "^0.11.0", "react-spring": "^9.4.4", "react-three-fiber": "^6.0.13", "reactstrap": "^9.0.1", "recharts": "^2.1.9", "redux": "^4.1.2", "redux-devtools-extension": "^2.13.9", "redux-promise": "^0.6.0", "redux-thunk": "^2.4.1", "regenerator-runtime": "^0.13.7", "remixicon": "^2.5.0", "slick-carousel": "^1.8.1", "styled-components": "^5.3.5", "three": "^0.139.2", "web-vitals": "^2.1.4", "web3": "^1.7.1", "web3modal": "^1.9.7"

## **발생한 이슈와 해결방법**

1.  DB 스키마 이슈

-   TABLE별 미흡한 관계설정
-   경험을 통해 중요성을 깨달음

2.  기능추가 이슈

-   스테이킹, NFT 옵션변경 > NFT 구매, 판매 기능 추가 이슈
-   기업과의 화상 회의에서 피드백을 참고해 문제해결

3.  코로나로 인한 비대면 이슈

-   협업툴 활용 정해진 시간에 리뷰
-   진행상황 공유하여 내용 숙지

4.  AWS 배포 이슈

-   배포과정의 어려움으로 관련 내용 숙지에 긴 시간이 소요
-   이번 경험을 토대로 정리 및 숙지 필요
