import { useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import { selectBoardFormApi, updateBoardApi, BASE_URL } from "../api/boardApi";

function BoardUpdateFormComponent() {

    // 실행할 구문
    // 우선 글번호 먼저 뽑기
    const boardNo = useLocation().state.boardNo;

    let navigate = useNavigate();

    // useRef 훅을 통해 input type="file" 요소를 참조할 수 있는 변수 셋팅
    const reupfileRef = useRef(null);

    // 기존의 게시글 내용을 담아둘 겸, 입력값도 표현할 겸 State 형 변수 셋팅
    const [board, setBoard] = useState({boardNo : "",
                                        boardTitle : "",
                                        boardContent : "",
                                        member : {userId : ""},
                                        originName : "",
                                        changeName : "",
                                        createDate : "",
                                        status : ""});

    useEffect(() => {

        // 기존의 일반게시글 내용을 불러와서 텍스트상자로 뿌려주기
        // > 기존에 공지사항 관련 기능에서는 공지사항 상세조회용 요청을 재활용했었음!!
        // > 일반게시글에는 "조회수" 개념이 있기 때문에 상세조회 요청에서
        //   조회수 증가 + 상세조회까지 한번에 처리했어서 요청 처리 코드의 재활용이 불가하다.
        //   (이번에는 조회수 증가 없이 딱 상세조회만 해서 돌아오고싶음)

        // 해결방법1)
        // 애초에 조회수 증가용 컨트롤러, 상세조회용 컨트롤러 따로 분리해서 만들고,
        // 상세조회 컴포넌트 쪽에서 이 요청을 순차적으로 axios 로 두번 다녀오는 것
        // > 실무에서는 굳이 두번으로 쪼개서 쓰진 않음 (성능 이슈)
        // 해결방법2)
        // 게시글만 하나 따로 조회해볼 수 있는 컨트롤러를 별도로 만드는것
        // > 이런 식으로 쓰는 것을 더 권장함!!

        const selectBoardForm = async () => {

            try {

                const response = await selectBoardFormApi(boardNo);

                console.log(response.data);

                setBoard(response.data);

                // console.log(board);

            } catch(error) {

                console.log("수정용 일반게시글 상세 조회 요청용 ajax 통신 실패!" + error);
            }
        };

        selectBoardForm();
    
    }, []);

    // 입력값이 변경될 때 마다 실행할 이벤트 핸들러 함수
    const handleChange = e => {

        const newBoard = {...board};

        newBoard[e.target.name] = e.target.value;

        setBoard(newBoard);
    };

    // 수정하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const updateBoard = async e => {

        e.preventDefault();
        // > 기본 이벤트 제거

        try {

            // 첨부파일 정보를 얻어내기 (useRef 로 DOM 참조)
            let reupfile = reupfileRef.current;
            // console.log(reupfile);
            // > current 속성에는 input type="file" 요소 객체 자체가 담겨있음!!

            // input type="file" 로 입력받은 파일 정보들은 .files 라는 배열 형식의 속성에 담김
            // console.log(reupfile.files.length);

            // 요청 시 전달값 중 첨부파일이 있다면 그냥 객체가 아닌 FormData 형식의 객체에 담는다.
            const formData = new FormData(); // {}

            formData.append("boardNo", board.boardNo);
            formData.append("boardTitle", board.boardTitle);
            formData.append("boardContent", board.boardContent);

            // 기존에 있던 첨부파일의 정보들도 같이 넘길것 (originName, changeName)
            formData.append("originName", board.originName);
            formData.append("changeName", board.changeName);

            // 기존 정보들을 모두 넘길 것 DynamicUpdate..
            formData.append("createDate", board.createDate);
            formData.append("count", board.count);
            formData.append("status", board.status);
            formData.append("member.userId", board.member.userId);
            // > 작성자의 id 만 넘기고 싶으면 "객체명.필드명" 키값

            // 새로운 첨부파일 정보도 넘기기
            if(reupfile.files.length == 1) {
                // > 새로운 첨부파일이 있을 경우

                formData.append("reupfile", reupfile.files[0]);
            }

            const response = await updateBoardApi(boardNo, formData);

            // console.log(response.data);

            if(response.data == "success") {
                // > 일반 게시글 수정 성공

                alert("게시글 수정에 성공했습니다.");

                // 해당 게시글의 상세조회 화면으로 이동
                navigate(`/board/detail/${ boardNo }`);

            } else {
                // > 일반 게시글 수정 실패

                alert("게시글 수정에 실패했습니다.");
            }

        } catch(error) {

            console.log("일반게시글 수정용 ajax 통신 실패!" + error);
        }
    };

    // return 구문
    return (
        <div>
            <h2 align="center">일반게시글 수정</h2>

            <br /><br />

            <form id="update-form">
                <table className="table form">
                    <tbody>
                        <tr>
                            <th width="130">제목</th>
                            <td>
                                <input type="text" name="boardTitle" 
                                                   value={ board.boardTitle } 
                                                   onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="boardContent"
                                          value={ board.boardContent }
                                          onChange={ handleChange }></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td>
                                <span>
                                    {
                                        (board.originName != null) ?
                                        (<a href={ `${ BASE_URL }/download/${ board.changeName }/${ board.originName }` }>
                                            { board.originName }
                                        </a>) :
                                        "첨부파일이 없습니다."
                                    }
                                </span>

                                {/* 수정할 첨부파일을 입력받은 용도 */}
                                <input type="file" name="reupfile" ref={ reupfileRef } />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <div align="center">
                    <button type="submit" className="btn btn-outline-primary btn-sm"
                                          onClick={ updateBoard }>
                        수정하기
                    </button>
                </div>

                <br /><br />

            </form>

        </div>
    );
}

// 내보내기
export default BoardUpdateFormComponent;