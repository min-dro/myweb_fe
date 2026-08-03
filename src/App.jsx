import { useState } from 'react';
import './App.css'

import Header from "./common/components/Header";
import Footer from "./common/components/Footer";

import { Routes, Route } from 'react-router-dom';

import Index from "./index";

import MemberListComponent from "./member/components/MemberListComponent";
import MemberDetailComponent from "./member/components/MemberDetailComponent";

import NoticeListComponent from "./notice/components/NoticeListComponent";
import NoticeEnrollFormComponent from "./notice/components/NoticeEnrollFormComponent";
import NoticeDetailComponent from "./notice/components/NoticeDetailComponent";
import NoticeUpdateFormComponent from "./notice/components/NoticeUpdateFormComponent";

import BoardListComponent from "./board/components/BoardListComponent";
import BoardEnrollFormComponent from "./board/components/BoardEnrollFormComponent";
import BoardDetailComponent from "./board/components/BoardDetailComponent";
import BoardUpdateFormComponent from "./board/components/BoardUpdateFormComponent";

function App() {
  
  // 실행할 구문
  // 화면 깜빡임 없이 로그인 전, 후 화면이 전환되야 하므로 "State" 형 변수가 필요험!!
  const [loginUser, setLoginUser] = useState(sessionStorage.getItem("loginUser"));
  // > sessionStorage.getItem("키값") : "밸류값" 리턴

  // console.log(loginUser); // null / "xxxx.xxxxx.xxx"

  if(loginUser == null) {

    // return 구문 - 로그인 전에는 메인페이지를 제외한 나머지 모든 화면이 보여지면 안됨
    return (
      <div>

        <Header />

        <div className="content">
          <Index loginUser={ loginUser } setLoginUser={ setLoginUser } />
        </div>

        <Footer />

      </div>
    );
  
  } else { // 로그인 후

      // return 구문 - 로그인 후에는 모든 화면이 다 보여져야함
      return (
        <div>
          
          {/* 모든 화면마다 상단에는 메뉴바 (Header) 배치 */}
          <Header />

          {/* 
            실제 화면 내용이 보여질 부분 (content 영역) 배치
            - 화면을 컴포넌트 단위로 만들고, Routes, Route 컴포넌트를 통해
              필요한 화면 컴포넌트의 갯수 만큼 URL 주소와 1:1 로 매핑하면 된다!!
          */}
          <div className="content">
            
            <Routes>
              <Route path="/" element={ <Index loginUser={ loginUser } setLoginUser={ setLoginUser } /> } />
              
              <Route path="/member/list" element={ <MemberListComponent /> } />
              <Route path="/member/detail/:userId" element={ <MemberDetailComponent /> }/>

              <Route path="/notice/list" element={ <NoticeListComponent /> } />
              <Route path="/notice/enrollForm" element={ <NoticeEnrollFormComponent /> } />
              <Route path="/notice/detail/:noticeNo" element={ <NoticeDetailComponent /> } />
              <Route path="/notice/updateForm" element={ <NoticeUpdateFormComponent /> } />

              <Route path="/board/list" element={ <BoardListComponent /> } />
              <Route path="/board/enrollForm" element={ <BoardEnrollFormComponent /> } />
              <Route path="/board/detail/:boardNo" element={ <BoardDetailComponent /> } />
              <Route path="/board/updateForm" element={ <BoardUpdateFormComponent /> } />
            </Routes>
            
          </div>

          {/* 모든 화면마다 하단에는 푸터 (Footer) 배치 */}
          <Footer />

        </div>
    )


  }
  
}

// 내보내기
export default App