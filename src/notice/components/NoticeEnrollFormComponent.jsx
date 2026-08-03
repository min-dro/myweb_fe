import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { insertNoticeApi } from "../api/NoticeApi";

function NoticeEnrollFormComponent() {

    // 실행할 구문
    // navigate 함수 셋팅
    let navigate = useNavigate();

    // 입력값을 담아둘 State 형 변수 셋팅
    const[notice, setNotice] = useState({noticeTitle : "",
                                         noticeContent : "",
                                         noticeWriter : "",
                                         status : "Y"});
    // > JWTY 를 이용해서 인증, 인가 기능을 붙였을 때, 현재 로그인한 사용자의 정보로
    //   작성자의 정보를 채워 넣어줘야함!!

    // 입력값의 변동이 있을 때마다 실행할 이벤트 핸들러 함수 셋팅
    const handleChange = e => {

        const newNotice = {...notice};
        
        newNotice[e.target.name] = e.target.value;

        setNotice(newNotice);
    };

    // 작성하기 버튼 클릭 시 실행할 이벤트 핸들러 함수 셋팅
    const insertNotice = async e => {

        e.preventDefault();
        // > 기본이벤트 제거

        try {

            const response = await insertNoticeApi(notice);

            // console.log(response.data);

            if(response.data == "success") {
                // > 공지사항 작성 성공

                alert("공지사항 작성에 성공했습니다.");

                // 작성 성공일 경우에만 목록 화면으로 이동
                navigate("/notice/list");

            } else {
                // > 공지사항 작성 실패

                alert("공지사항 작성에 실패했습니다.");
            }

        } catch(error) {

            console.log("공지사항 등록용 ajax 통신 실패!" + error);
        }
    };

    // return 구문
    return (
        <div>
            <h2 align="center">공지사항 작성</h2>

            <br /><br />

            <form id="enroll-form">
                <table className="form table">
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="noticeTitle"
                                                   value={ notice.noticeTitle }
                                                   onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="noticeContent"
                                          value={ notice.noticeContent }
                                          onChange={ handleChange }></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <div align="center">
                    <button type="submit"
                            className="btn btn-outline-primary btn-sm"
                            onClick={ insertNotice }>
                        작성하기
                    </button>
                    &nbsp;&nbsp;
                    <button type="reset"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={ () => { setNotice({noticeTitle : "",
                                                         noticeContent : ""}); } }>
                        초기화
                    </button>
                </div>

                <br /><br />

            </form>

        </div>
    );
}

// 내보내기
export default NoticeEnrollFormComponent;