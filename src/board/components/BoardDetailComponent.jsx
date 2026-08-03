import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { selectBoardApi, deleteBoardApi, BASE_URL } from "../api/boardApi";

function BoardDetailComponent() {

    // 실행할 구문
    // 해당 글번호부터 뽑아내기
    const boardNo = useParams().boardNo;

    let navigate = useNavigate();

    // 화면에 출력할 게시글 데이터를 담을 State 형 변수
    const [board, setBoard] = useState({boardNo : "",
                                        boardTitle : "",
                                        member : {},
                                        boardContent : "",
                                        createDate : "",
                                        originName : "",
                                        changeName : ""});

    // 이 컴포넌트가 브라우저에 다 로딩된 후 딱 한번 실행할 구문
    useEffect(() => {

        const selectBoard = async () => {

            try {

                const response = await selectBoardApi(boardNo);

                // console.log(response.data);

                if(response.data != "") {
                    // > 조회된 내용이 있다면

                    setBoard(response.data);

                } else {
                    // > 조회된 내용이 없다면

                    alert("이미 삭제되거나 없는 게시글입니다.");

                    // 일반게시글 목록 조회 페이지로 이동
                    navigate("/board/list");
                }

            } catch(error) {

                console.log("일반게시글 상세조회용 ajax 통신 실패!"  + error);
            }
        };

        // 여기에 댓글 목록 조회용 async 함수 정의

        selectBoard();

        // 여기서 댓글 목록 조회용 함수 호출

    }, []);

    // 삭제하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const deleteBoard = async () => {

        try {
            
            const response = await deleteBoardApi(boardNo);

            // console.log(response.data);

            if(response.data == "success") {
                // > 삭제 성공일 경우

                alert("게시글 삭제에 성공했습니다.");

                // 일반게시글 목록 조회 화면으로 이동
                navigate("/board/list");

            } else {
                // > 삭제 실패일 경우

                alert("게시글 삭제에 성공했습니다.");
            }

        } catch(error) {

            console.log("일반게시글 삭제용 ajax 통신 실패!" + error);
        }
    };
    
    // return 구문
    return (
        <div>
            <h2 align="center">일반게시글 상세 조회</h2>

            <br /><br />

            <table className="table">
                <tbody>
                    <tr>
                        <th width="130">제목</th>
                        <td colSpan="3">
                            { board.boardTitle }
                        </td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{ board.member.userId }</td>
                        <th width="130">작성일</th>
                        <td>{ board.createDate.substring(0, 10) }</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colSpan="3">
                            <p style={ {height : "200px"} }>
                                { board.boardContent }
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td colSpan="3">
                            {
                                /*
                                    - 기존에 배운대로 a 태그의 href 속성에는 실제 파일이 저장된 서버의 물리적인 경로를,
                                      download 속성에는 원본파일명을 작성했음에도 불구하고
                                      실제 a 태그 클릭 시 파일 다운로드가 되지 않고 있음!! (브라우저 상으로 파일은 잘 보임)
                                    - 실제 다운로드 하려는 쪽은 리액트 서버쪽이고, 실제로 파일을 제공해주려는 곳은 백엔드 스프링 서버임!!
                                      그러다보니 자연스럽게 "크로스 오리진 이슈" 로 인해 다운로드가 보안 상 막히게 된다.

                                    해결방법)
                                    href 에 changeName 을 넘기면서 다운로드 요청을 별도로 백엔드 서버에 보낸다.
                                    백엔드서버헤서는 다운로드 요청을 받아서, 해당 파일을 찾은 후
                                    해당 파일 자체를 "응답데이터" 로 넘겨준다!! (약간의 설정을 덧붙여서)

                                    - 참고로 Path Variable 방식으로 여러개의 데이터를 보낼 수도 있다!!
                                */
                               (board.originName != null) ?
                               (<a href={ `${ BASE_URL }/download/${ board.changeName }/${ board.originName }`}>
                                   { board.originName }
                                   </a>) :
                                "첨부파일이 없습니다"
                            }
                        </td>
                    </tr>
                </tbody>
            </table>

            <br /><br />
            
            <div align="center">
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={ () => { navigate("/board/list"); } }>
                    목록으로
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-warning btn-sm"
                        onClick={ () => { navigate("/board/updateForm", {state : {boardNo}}); } }>
                    수정하기
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-outline-danger btn-sm"
                        onClick={ deleteBoard }>
                    삭제하기
                </button>
            </div>

            <br /><br />

            {/* 댓글 목록도 이자리에서 조회해볼 수 있음 + 댓글 관련 기능 추가 */}

        </div>
    );
}

// 내보내기
export default BoardDetailComponent;