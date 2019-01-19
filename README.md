# portfolio3

포트폴리오 사이트 버전3 입니다.
nodejs,jquery,javascript,html,css 를 사용했습니다. 
모든 요소를 직접 코딩했고 디자인은 웹을 돌아다니면서 본 것들을 따라 만든 부분이 많습니다.

## 주요 기능
*기능
 * 프로젝트 CRUD
 * 프로젝트 페이징 및 빈 섹션 채워넣기
 * 게스트북 글 저장 및 불러오기
 * id가 admin이 아닌 글 N분마다 삭제 기본값 : 30분  
 * 회원가입 , 로그인세션
 * 스크롤 spy
 * 반응형 요소 조절 
 * xss 공격 방어
 * 다른 기능이 더 추가될 예정입니다.


## 다운받아서 직접 실행해보시는 방법
 * 1.mysql 데이터베이스에 DB디렉토리의 gyutae_member.sql,gyutae_project.sql,gyutae_visit.sql 파일을 import 
 * 2.DB 디렉토리의 property 파일에 데이터베이스 이름과 아이디 비밀번호 저장
 * 3.cmd -> cd 저장경로/portfolio3 -> node app.js -> 브라우저에서 localhost:4500 

[데모보기](http://kutaelee.iptime.org:4500)
