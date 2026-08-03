import axios from "axios";

const BASE_URL = "http://3.35.201.88:8006/myweb/auth";

// 인증 요청용
const loginMemberApi = member => {

    const response = axios({
        url : `${ BASE_URL }/login`,
        // > 인증 / 인가 기능은 회원 관리 기능과 별개로 로그인 및 권한체크 용도로 쓸 것이기 때문에
        //   /members 가 아닌 /auth 요청쪽으로 별도로 뺄 것!!
        method : "post",
        // > 로그인 기능의 경우 아이디와 비밀번호를 SELECT 문으로 "조회" 하긴 하나,
        //   그렇다고 해서 GET 으로 요청을 보내면 URL 주소 상에 아이디와 비밀번호가
        //   쿼리스트링 형식으로 모두 노출될 것!!
        // > REST API 규칙을 지키지 못하는 상황 발생!!
        //   예전에 배운 대로 기술적으로 접근해서 POST 요청을 써야함
        data : member
    });

    return response;
};

export { loginMemberApi }