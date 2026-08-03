import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { selectNoticeApi, updateNoticeApi } from "../api/NoticeApi";

function NoticeUpdateFormComponent() {

    // 실행할 구문
    // 수정 실패 시 기존의 게시글 내용이 다시 보여졌으면 좋겠음!!
    // 수정 성공인지 실패인지 판별할 수 있는 변수를 셋팅
    const [result, setResult] = useState("success");
    // > 기본적으로 "success" 로 초기화 뒤, 실패하면 "fail" 로 덮어 씌운 후
    //   useEffect 안의 함수 (공지사항 상세 조회 구문) 이 다시 실행되도록 유도 [result]

    // 눈에 안보이게 전달했기 때문에 location 객체를 통해 글번호 뽑기
    // let location = useLocation(); // {state : {}}
    // const noticeNo = location.state.noticeNo;

    const noticeNo = useLocation().state.noticeNo;

    // console.log(noticeNo);

    let navigate = useNavigate();

    // 기존의 공지사항 정보를 담을 겸, 입력받은 값을 담을 겸 객체 형식의 State 변수
    const [notice, setNotice] = useState({noticeNo : "",
                                          noticeTitle : "",
                                          noticeWriter : "",
                                          noticeContent : "",
                                          createDate : "",
                                          status : ""});

    // 수정하기 페이지에서는 기존의 공지사항 글 정보가 먼저 보여져야 하므로
    // 이 컴포넌트가 최초로 단 한번 로딩된 후 딱 한번 실행할 구문 안에서 상세조회를 먼저 해와야함
    useEffect(() => {

        const selectNotice = async () => {

            try {

                const response = await selectNoticeApi(noticeNo);

                // console.log(response.data);

                setNotice(response.data);

            } catch(error) {

                console.log("공지사항 상세 조회용 ajax 통신 실패!" + error);
            }
        };

        selectNotice();

    }, [result]);

    // 입력값 변경 시 실행할 이벤트 핸들러 함수
    const handleChange = e => {

        const newNotice = {...notice};

        newNotice[e.target.name] = e.target.value;

        setNotice(newNotice);
    };

    // 수정하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const updateNotice = async e => {

        e.preventDefault();
        // > 기본 이벤트 제거

        try {

            const response = await updateNoticeApi(noticeNo, notice);

            // console.log(response.data);

            if(response.data == "success") {
                // > 공지사항 수정 성공일 경우

                alert("공지사항 수정에 성공했습니다.");

                // 해당 게시글의 상세조회 페이지로 다시 이동
                navigate(`/notice/detail/${ noticeNo }`);

            } else {
                // > 공지사항 수정 실패일 경우

                alert("공지사항 수정에 실패했습니다.");

                // 기존 공지사항 내용을 다시 불러와서 출력
                // 방법1) 위의 useEffect 내부의 변수인 selectNotice 함수를 컴포넌트 함수 Scope 로
                //        지역변수로 빼고, 여기서 호출만 해주면 됨!! (회원 정보 수정 때 해봤던 방법)
                // 방법2) useEffect 의 [] 를 이용하는 방법
                setResult(response.data);
            }

        } catch(error) {

            console.log("공지사항 수정용 ajax 통신 실패!" + error);
        }
    };

    // return 구문
    return (
        <div>
            <h2 align="center">공지사항 수정</h2>

            <br /><br />

            <form id="update-form">
                <table className="table form">
                    <tbody>
                        <tr>
                            <th width="130">제목</th>
                            <td>
                                <input type="text" name="noticeTitle" value={ notice.noticeTitle }
                                                   onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="noticeContent" value={ notice.noticeContent }
                                          onChange={ handleChange }></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <div align="center">
                    <button type="submit" className="btn btn-outline-primary btn-sm"
                                          onClick={ updateNotice }>
                        수정하기
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-outline-secondary btn-sm"
                            onClick={ () => { navigate(`/notice/detail/${noticeNo}`); } }>
                        뒤로가기
                    </button>
                    {/*
                        뒤로가기도 마찬가지로 화면이 깜빡거리면 안되기 때문에 
                        navigate 함수를 통해 뒤로 가야할 URL 주소를 대놓고 제시했음!!
                    */}
                </div>

                <br /><br />

            </form>

        </div>
    );
}

// 내보내기
export default NoticeUpdateFormComponent;