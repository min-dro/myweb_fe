import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react"

import { selectMemberApi, updateMemberApi, deleteMemberApi } from "../api/memberApi";

function MemberDetailComponent() {

    // 실행할 구문
    // 조회해온 회원의 정보를 담을 겸 회원 정보 입력값도 담을 겸 해서 State 형 변수 셋팅
    const [member, setMember] = useState({userId : "",
                                          userName : "",
                                          email : "",
                                          gender : "",
                                          age : 0,
                                          phone : "",
                                          address : "",
                                          status : "" });

    // navigate 함수 얻어내기
    let navigate = useNavigate();

    // Path Variable 방식으로 navigate 함수에 의해 전달된 회원의 아이디값 먼저 뽑기
    const userId = useParams().userId;
    // console.log(userId);

    // 이 컴포넌트가 최초로 단 한번 로딩된 후 딱 한번만 실행할 구문
    useEffect(() => {

        selectMember();

    }, []);

    // 회원 한명의 정보를 조회해올 수 있는 함수
    const selectMember = async () => {

        try {

            const response = await selectMemberApi(userId);

            // console.log(response.data);
            
            // 조회해온 데이터를 변수에 담기
            const item = response.data;

            if(item == "") {
                // > 해당 회원이 없을 경우

                alert("존재하지 않는 회원입니다.");
            
                // 회원 목록 조회 URL 로 다시 이동 (navigate 함수)
                navigate("/member/list");

            } else {
                // > 해당 회원이 존재할 경우
                
                // console.log(item);

                setMember(item);
            }

        } catch(error) {

            console.log("회원 상세조회용 ajax 통신 실패!" + error);
        }
    };


    // 입력값 변경 시 State 변수에 반영하는 이벤트 핸들러 함수
    const handleChange = e => {

        // console.log(e.target.name, e.target.value);
        
        // const name = e.target.name;
        // const value = e.target.value;
        const {name, value} = e.target;

        const newMember = {...member};

        newMember[name] = value;
        
        setMember(newMember);
    };

    // 수정하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const updateMember = async e => {

        e.preventDefault();
        // > submit 기본 이벤트 제거

        try {

            const response = await updateMemberApi(userId, member);

            // console.log(response.data);

            if(response.data == "success") {

                alert("회원 정보 수정에 성공했습니다.");
            
            } else {
            
                alert("회원 정보 수정에 실패되었습니다.");
            }

            // 갱신된 회원의 정보를 다시 조회해서 화면에 출력해야함
            selectMember();

        } catch(error) {
            
            console.error("회원 정보 수정용 ajax 통신 실패!" + error);
        }
    };

    // 탈퇴하기 버튼 클릭 시 실행할 이벤트 핸들러 함수
    const deleteMember = async () => {

        try {

            const response = await deleteMemberApi(userId);

            // console.log(response.data);

            if(response.data == "success") {
               // > 회원 탈퇴에 성공했을 경우
                
                alert("회원 탈퇴에 성공했습니다.");
                
            } else {
                // > 회원 탈퇴에 실패했을 경우

                alert("회원 탈퇴에 실패되었습니다.");
            }

            // 갱신된 회원의 정보를 다시 불러와서 출력
            selectMember();

        } catch(error) {

            console.error("회원 탈퇴용 ajax 통신 실패!" + error);
        }
        
    };

    // return 구문
    return (
        <div>
            <h2 align="center">회원 상세 조회</h2>

            <br/><br/>

            {/* 마이페이지 형식으로 회원 정보 수정폼에 출력까지 겸하게끔 */}
            <form id="update-form">

                <table className="form table">
                    <tbody>
                        <tr>
                            <th width="130">아이디</th>
                            <td>
                                <input type="text" name="userId" value={ userId } readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type="text" name="userName" value={ member.userName } onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input type="email" name="email" value={ member.email } onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td>
                                <label><input type="radio" name="gender" value="M" checked={ member.gender == "M" } onChange={ handleChange } /> 남자</label>
                                &nbsp;&nbsp;
                                <label><input type="radio" name="gender" value="F" checked={ member.gender == "F" } onChange={ handleChange }/> 여자</label>
                                &nbsp;&nbsp;
                                <label><input type="radio" name="gender" value="" checked={ (member.gender == null) || (member.gender == "") } onChange={ handleChange } /> 선택안함</label>
                            </td>
                        </tr>
                        <tr>
                            <th>나이</th>
                            <td>
                                <input type="number" name="age" value={ member.age } onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input type="text" name="phone" value={ member.phone } onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input type="text" name="address" value={ member.address } onChange={ handleChange } />
                            </td>
                        </tr>
                        <tr>
                            <th>탈퇴여부</th>
                            <td>
                                <span name="status">{ (member.status == "N") ? "탈퇴" : "-" }</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <div align="center">
                    <button type="submit" className="btn btn-outline-primary btn-sm"
                                          onClick={ updateMember }>수정하기</button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-outline-danger btn-sm"
                                          disable={ member.status == "N" }
                                          onClick={ deleteMember }>탈퇴하기</button>
                    {/* 버튼 disabled 속성 또한 표현식 안에 자바스크립트 조건식을 이용해서 true 또는 false 로 control 가능 */}
                </div>
                
            </form>

            <br/><br/>

        </div>
    );
}

// 내보내기
export default MemberDetailComponent;