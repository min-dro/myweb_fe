import { useState, useEffect } from "react";

import { selectMemberListApi }from "../api/memberApi";

import MemberItemComponent from "./MemberItemComponent";

// 회원 목록 조회 화면을 나타내는 컴포넌트
function MemberListComponent() {

    // 실행할 구문

    // 조회된 데이터들을 tr 요소로 감싼 배열을 담아둘 State 형 변수 셋팅
    const [dataList, setDataList] = useState([]);

    useEffect(() => {

        const selectMemberList = async () => {

            try {

                const response = await selectMemberListApi();

                // console.log(response.data);

                // 조회된 데이터들을 별도의 변수로 빼두기
                const items = response.data;

                // 반복을 돌려가면서 tr 요소로 재가공
                const trArr = items.map((item, index) => {

                    return (
                        <MemberItemComponent item={ item } key={ index } />
                    );
                });

                setDataList(trArr);

            } catch(error) {

                console.log("회원 목록 조회용 ajax 통신 실패!" + error);
            }
        };

        selectMemberList();

    }, []);

    // return 구문
    return (
        <div>

            <h2 align="center">회원 목록 조회</h2>
        
            <br/><br/>
        
            <table className="list-area table table-hover">
                <thead>
                    <tr>
                        <th width="180">아이디</th>
                        <th width="150">회원명</th>
                        <th width="250">이메일</th>
                        <th width="100">성별</th>
                        <th width="100">나이</th>
                        <th width="150">회원가입일</th>
                        <th width="100">탈퇴여부</th>
                    </tr>
                </thead>
                <tbody>{ dataList }</tbody>
            </table>

            <br/><br/>

        </div>
    );
}

// 내보내기
export default MemberListComponent;