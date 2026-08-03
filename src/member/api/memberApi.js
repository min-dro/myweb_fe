// axios 를 직접적으로 호출하는 구문들만 별도로 뺀 파일
// > 컴포넌트 쪽에는 진짜 화면을 그리는 로직들만, Api 파일에는 axios 호출 구문만 둬서 역할을 분리한다!!
// > 단, import, export 를 잘 신경 써서 실수하지 않도록 하자!!
// > 또한, 코드를 분리했다고 해서 async 와 await 도 누락시키면 안된다!!

import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 이 파일 내의 모든 함수에서 공통적을
// "http://localhost:8006/myweb/members" 까지가 공통 호출 URL 주소임!!
// > 전역변수로 빼기
const BASE_URL = "http://3.35.201.88:8006/myweb/members";
// > 추후 운영 또는 배포상의 이유로 ip주소 또는 포트번호 또는 context path 등이 변경되면
//   이 변수값만 수정하면 모두 반영됨!!
// > 실제 배포 시에는 localhost 대신 EC2 의 퍼블릭 IP를 작성해야함!!
// > EC2 의 퍼블릭 IP 는 매번 유동적인 값이기 때문에 고정해두고 쓰고 싶다면
//   탄력적 IP 를 연결해서 쓰면 된다!!

// 회원 목록 조회용
const selectMemberListApi = () => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
            // > 요청 시 인가용 jwt 를 같이 보낼 때 쓰는 속성명
            // > jwt 토큰 앞에 "Bearer " 를 접두어로 같이 붙여서 보낼 것!!
            //   (안붙여도 됨, Http 통신 방식에서의 표준이기 때문에 붙이는걸 권장)
        }
        // > 요청 시 설정값들을 URL 주소의 Header 영역에 담아 (값이 노출 되는 영역) 넘겨주는 속성
        // > 인가 기능 구현 시, 요청 때 마다 요청 시 전달값으로 jwt (티켓) 를 같이 넘긴다!!
        //   요청이 Controller 로 도달하기 전에 (Interceptor), 백엔드에서 먼저 jwt 를 꺼낸다.
        //   제대로된 토큰인지를 검사한 후, 통과 / 불통과 여부를 가른다.
    });
    
    return response;
};

// 회원 상세 조회용
const selectMemberApi = userId => {

    const response = axios({
        url : `${ BASE_URL }/${ userId }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 회원 정보 수정용
const updateMemberApi = (userId, member) => {

    const response = axios({
        url : `${ BASE_URL }/${ userId }`,
        method : "put",
        data : member,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 회원 탈퇴용
const deleteMemberApi = userId => {

    const response = axios({
        url : `${ BASE_URL }/${ userId }`,
        method : "delete",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 내보내기
export { selectMemberListApi, selectMemberApi, updateMemberApi, deleteMemberApi };