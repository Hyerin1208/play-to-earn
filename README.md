
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


### 페이지 별 프로젝트 내 사용 기술

|      페이지      | 사용 기술 |
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

