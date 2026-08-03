import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";

/*
 * 1. 프로젝트 생성 (보통 프로젝트명_fe 으로 짓는다)
 * 2. axios, react-router-dom@6 모듈 설치
 * 3. main.jsx 에서 App 컴포넌트를 BrowserRouter 컴포넌트로 감싸기
 * 4. index.css, App.css 의 기본코드 지우기
 *    (둘 중에 파일은 하나만 살리기)
 * 5. App.jsx 에서 기본 화면 코드를 날리고 작업 시작하기
 * 6. src 폴더에 도메인 별로 (회원, 공지사항, 게시글 등) 폴더 생성
 * - 각 도메인 별 폴더 내에 components, styles 폴더를 각각 또 생성
 *   (components 에는 .jsx, style 애는 .css 파일을 저장한다)
 */

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

/*
 * * 리액트와 스프링 부트를 연동해서 "관리자 페이지 (ERP)" 만들기 
 * 
 * 1. 회원 관리 기능
 * 회원 목록 조회 - R (Read) : SELECT 문        GET     /members
 * 회원 상세 조회 - R (Read) : SELECT 문        GET     /members/{userId}
 * 회원 정보 수정 - U (Update) : UPDATE 문      PUT     /members/{userId} + data 전송
 * 회원 탈퇴 - D (Delete) : UPDATE 문           DELETE  /members/{userId}
 * 
 * 2. 공지사항 관리 기능
 * 공지사항 목록 조회 - R (Read) : SELECT 문    GET      /notices
 * 공지사항 상세 조회 - R (Read) : SELECT 문    GET      /notices/{noticeNo}
 * 공지사항 작성 - C (Create) : INSERT 문       POST     /notices + data 전송
 * 공지사항 수정 - U (Update) : UPDATE 문       PUT      /notices/{noticeNo} + data 전송
 * 공지사항 삭제 - D (Delect) : UPDATE 문       DELECT   /notices/{noticeNo}
 * 
 * 3. 일반게시판 관리 기능
 * 일반게시글 목록 조회 + 페이징처리 - R (Read) : SELECT 문       GET     /boards + params 전송
 * 일반게시글 검색 + 페이징처리 - R (Read) : SELECT 문            GET     /boards/{keyword} + params 전송
 * 일반게시글 작성 + 첨부파일1개업로드 - C (Create) : INSERT 문    POST    /boards + data 전송
 * 일반게시글 상세 조회 - R (Read) : SELECT 문                    GET     /boards/{boardNo}
 * 일반게시글 수정 - U (Update) : UPDATE 문                       PUT     /boards/{boardNo} + data 전송
 * 일반게시글 삭제 - D (Delete) : DELETE 문                       DELETE  /boards/{boardNo}
 * 
 * + 일반게시글 상세조회에서 댓글 목록 조회
 * + (관리자라면) 댓글 삭제
 * + 댓글 추가, 댓글 수정
 * 
 * - 일반게시글 검색 부분관 일반게시글 상세 조회 쪽 URL 주소가 겹침!!
 *   추후 실제 구현 시 고민해보고 바꿀 예정!!
 * > 검색 요청에 대한 URL 을 /boards/search + params 전송 형식으로 변경했음!!
 *   URL 주소 상에 어쩔 수 없이 search 라는 동사를 추가했음!! (구분하기 위해서)
 *   방법1) 일반 목록 조회와 URL 주소를 맞추고, Controller 에 모든 요청 처리 구문을 때려박는 방법
 *   방법2) Rest API 원칙을 어기되, Controller 를 분리해서 짜는 방법 - 우리가 선택한 방법
 *   실무에서는 둘 다 많이 쓰임!! 꼭 Rest API 원칙을 100% 지킬 필요는 없고,
 *   편의상, 함께 일하는 협업자들의 약속상 편한 방식을 쓰면 된다!!
 * 
 * - 일반게시글 수정 부분도 PUT 으로 요청할 예정이라고 적긴 했으나,
 *   실제 구현 시에는 POST 로 요청할 것!!
 */

/*
 * * CRUD 기능 자체는 제대로 잘 동작함!!
 * > 로그인 기능이 없다 보니 아무나 접속해서 CRUD 처리가 가능해짐!!
 * > 이런식으로 아무나 접속해서 CRUD 처리가 가능하게끔 해주는 웹사이트는 일반적으로 없을 뿐만 아니라,
 *   있다 하더라도 큰일 남!!
 * > 로그인으로 허용된 사람인지 먼저 확인하고, CRUD 처리가 가능하게끔 해줘야 함!!
 * 
 * 4. 인증 / 인가 관련 기능
 * 
 * * 인증 (Auhentication)
 * - 회원 본인이 맞는지를 검사 (즉, 로그인 기능을 나타냄)
 * - 아이디 + 비밀번호를 입력받아서 그 회원 정보가 일치하는지를 확인
 * 
 * > 기존의 로그인 기능 구현 방법 (JSP + Spring)
 *   아이디 + 비밀번호를 입력받아서 그 회원 정보가 일치하면, HttpSession 객체에 그 회원의 정보를 담아둠
 * > React + Spring 에서의 로그인 기능 구현 방법
 *   아이디 + 비밀번호를 입력받아서 그 회원 정보가 일치하면, React 가 브라우저 상에서 꺼내 쓸 수 있는 공간에
 *   그 회원 정보를 담아둠
 *   (HttpSession 과 같은 서블릿 스코프 내장객체 4종류들은 JSP + Spring 조합에서만 사용 가능)
 * 
 * * 인가 (Authorization)
 * - 이 요청을 보낼 수 있는 사람이 보낸 요청인지를 검사
 *   (즉, 이 회원이 이 기능을 쓸 수 있는 권한이 있는지 검사)
 * - 인증 이후에 일어나는 과정이다. (인증 없이는 불가함)
 * - 매 요청마다 브라우저 저장소에 저장된 회원 정보를 요청 시마다 같이 보내서
 *   이 회원이 충분한 권한이 있는지를 검사하고, 통과하면 그 요청을 제대로 처리해주게끔 구현함
 * - 권한에 따라 접근 가능한 기능을 제한
 * 
 * > 기존의 인가 기능 구현 방법 (JSP + Spring)
 *   매 요청마다 로그인한 회원의 정보를 같이 안보내도 권한 검사가 가능했었음
 *   (어차피 전역변수인 HttpSession 에 이미 해당 회원의 정보가 담겨있었기 때문에)
 *   Spring 의 인터셉터를 통해 권한이 없는 경우에는 Controller 접근을 막았음
 *   (Controller 접근만 막아도 응답페이지가 통으로 막혔었음 - 손쉽게 인가 기능을 구현할 수 있었음)
 * > React + Spring 에서의 인가 기능 구현 방법
 *   매 요청마다 로그인한 회원 정보를 요청 시 전달값들과 함께 같이 보내고
 *   Spring 의 인터셉터를 통해 권한이 있나 없나 검사 후 비슷하게 막긴 할 것!!
 * 
 * => 결국, 구현 방법이 달라지는 핵심원인은 React 로 프론트엔드를 분리함으로써
 *    기존에 쓰던 Servlet Scope 내장 객체 4종류를 못쓴다라는 점임!!
 */