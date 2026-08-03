import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { selectNoticeApi, deleteNoticeApi } from "../api/NoticeApi";

function NoticeDetailComponent() {

    // 실행할 구문
    // Path Variable 방식으로 얻어온 글번호 셋팅
    const noticeNo = useParams().noticeNo;
    
    // 조회해온 공지사항 데이터를 담아둘 State 형 변수 셋팅
    const [notice, setNotice] = useState({noticeNo : "",
                                          noticeTitle : "",
                                          member : {userId : ""},
                                          noticeContent : "",
                                          createDate : ""});

    let navigate = useNavigate();

    // 이 컴포넌트가 단 한번 로딩 된 직후 딱 한번만 실행할 수 있는 구문
    useEffect(() => {

        const selectNotice = async () => {

            try {

                const response = await selectNoticeApi(noticeNo);

                // console.log(response.data);
                
                if(response.data != "") {
                    // > 상세 조회가 제대로 된 경우

                    // 그대로 State 형 변수에 담기 (setter 로)
                    setNotice(response.data);

                } else {
                    // > 조회할 데이터가 없는 경우
                    
                    alert("이미 삭제되거나 없는 공지사항입니다.");

                    // 공지사항 목록 페이지로 이동
                    navigate("/notice/list");
                }

            } catch(error) {

                console.log("공지사항 상세 조회용 ajax 통신 실패!" + error);
            }
        };

        selectNotice();

    }, []);

    // 삭제하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const deleteNotice =  async () => {

        try {

            const response = await deleteNoticeApi(noticeNo);

            // console.log(response.data);

            if(response.data == "success") {
                // > 공지사항 삭제에 성공한 경우

                alert("공지사항 삭제에 성공했습니다.");

                // 공지사항 목록 페이지로 이동
                navigate("/notice/list");

            } else {
                // > 공지사항 삭제에 실패한 경우

                alert("공지사항 삭제에 실패했습니다.");
            }

        } catch(error) {

            console.log("공지사항 삭제용 ajax 통신 실패!" + error);
        }
    };

    // return 구문
    return (
        <div>
            <h2 align="center">공지사항 상세 조회</h2>

            <br /><br />

            <table className="table">
                <tbody>
                    <tr>
                        <th width="130">제목</th>
                        <td colSpan="3">
                            { notice.noticeTitle }
                        </td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{ notice.member.userId }</td>
                        <th width="130">작성일</th>
                        <td>{ notice.createDate.substring(0, 10) }</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colSpan="3">
                            <p style={ {height : "300px"} }>
                                { notice.noticeContent }
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br /><br />

            <div align="center">
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={ () => { navigate("/notice/list"); } }>
                    목록으로
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-warning btn-sm"
                        onClick={ () => { navigate("/notice/updateForm", {state : {noticeNo}}); } }>
                    수정하기
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-danger btn-sm"
                        onClick={ deleteNotice }>
                    삭제하기
                </button>
            </div>

            <br /><br />

        </div>
    );
}

// 내보내기
export default NoticeDetailComponent;