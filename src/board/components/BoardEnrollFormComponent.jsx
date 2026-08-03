import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { insertBoardApi } from "../api/boardApi";

function BoardEnrollFormComponent() {

    // 실행할 구문
    let navigate = useNavigate();

    // 입력값을 저장할 객체 형식의 State 형 변수 셋팅
    const [board, setBoard] = useState({boardTitle : "",
                                        boardContent : ""});

    // input type="file" 의 입력값을 DOM 으로부터 참조해서 가져오기 위한 변수 셋팅
    const upfileRef = useRef(null);
    // > 게시글 작성 페이지 최초 진입 시에는 file 입력값이 null 이 되도록 초기화

    // 입력값의 변화가 있을 때 마다 실행할 이벤트 핸들러 함수
    const handleChange = e => {

        const newBoard = {...board};

        newBoard[e.target.name] = e.target.value;

        setBoard(newBoard);
    };

    // 작성하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const insertBoard = async e => {

        e.preventDefault();
        // > 기본이벤트 제거

        try {

            // 요청 시 전달값 셋팅
            // boardTitle, boardContent, boardWriter + 첨부파일정보
            // console.log(board.boardTitle, board.boardContent, board.boardWriter);

            // 위에서 useRef 훅을 이용해서 DOM 을 참조해서 첨부파일의 정보를 알아내기로 했었음!!
            let upfile = upfileRef.current

            // console.log(upfile);
            // > current 속성에는 현재 이 DOM 요소 객체 자체가 담겨있음!!
            // > 사실상 let upfile = document.getElementByName("upfile")[0]; 와 같음

            // console.log(upfile.files);
            // > 이전에 이미지 미리보기 기능 구현 시 써봤던 속성
            // > input type="file" 요소는 입력받은 파일의 정보들이 files 라는 배열 형식 속성에 담겨있다.
            // > 입력받은 파일이 있다면 upfile.files.length == 1
            //   입력받은 파일이 없다면 upfile.files.length == 0

            // console.log(upfile.files.length);
            // console.log(upfile.files[0]);
            // > input type="file" 요소로 여러개의 파일을 한번에 입력받을 수 있기 때문에
            //   입력받은 파일들의 정보는 files 배열의 0번 인덱스에서 부터 차곡차곡 담김

            // ajax 로 요청 시 전달값 중 첨부파일이 있다면,
            // 반드시 일반 객체 형식 ({}) 이 아닌 FormData 라는 형식의 객체로 담아서 넘겨줘야 한다.
            const formData = new FormData(); // {}

            formData.append("boardTitle", board.boardTitle);
            formData.append("boardContent", board.boardContent);
            formData.append("boardWriter", board.boardWriter);
            // > FormData 형식의 객체에 요청 시 전달값들을 키 : 밸류 형식으로 추가하고 싶다면
            //   append 메소드를 호출해서 쓴다!!

            if(upfile.files.length == 1) {
                // > 입력받은 파일이 있을 경우

                formData.append("upfile", upfile.files[0]);
                // > 입력받은 첨부파일 정보를 그대로 넣어준다.
            }

            /*
                만약 다중 첨부파일 업로드를 하고 싶다면
                formData.append("upfile1", xxx);
                formData.append("upfile2", xxx);
                ...
            */

            const response = await insertBoardApi(formData);

            // console.log(response.data);

            if(response.data == "success") {
                // > 일반게시글 작성 성공일 경우

                alert("게시글 작성에 성공했습니다.");

                // 게시글 목록 조회쪽으로 URL 이동
                navigate("/board/list");
            
            } else {
                // > 일반게시글 작성 실패일 경우

                alert("게시글 작성에 실패했습니다.");
            }
            
        } catch(error) {

            console.log("일반게시글 작성용 ajax 통신 실패!" + error);
        }
    };

    // return 구문
    return (
        <div>
            <h2 align="center">일반게시글 작성</h2>

            <br /><br />

            <form id="enroll-form">

                <table className="form table">
                    <tbody>
                        <tr>
                            <th width="130">제목</th>
                            <td>
                                <input type="text" name="boardTitle" value={ board.boardTitle }
                                                                     onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="boardContent" value={ board.boardContent }
                                                              onChange={ handleChange } ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td>
                                <input type="file" name="upfile" ref={ upfileRef } />
                                {/*
                                    - input type="file" 만큼은 제어 컴포넌트로 둘 수 없다!!
                                    - 어쩔 수 없이 DOM 으로부터 입력된 파일 정보를 얻어내야한다.
                                    방법1) 우리가 이전에 배웠던 document 객체 관련 구문 이용
                                    방법2) ref 라는 속성으로 DOM 참조하도록 유도
                                */}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <div align="center">
                    <button type="submit" className="btn btn-outline-primary btn-sm"
                                          onClick={ insertBoard }>
                        작성하기
                    </button>
                    &nbsp;&nbsp;
                    <button type="reset" className="btn btn-outline-secondary btn-sm"
                                         onClick={ () => {
                                            setBoard({boardTitle : "",
                                                      boardContent : "",
                                                      boardWriter : "admin"});
                                         } }>
                        초기화
                    </button>
                </div>
                
                <br /><br />

            </form>

        </div>
    );
}

// 내보내기
export default BoardEnrollFormComponent;