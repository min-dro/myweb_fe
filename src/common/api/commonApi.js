// 토큰을 꺼내오는 공통 함수처리
// > auth/api/authApi.js 에 정의해도되고, common/api/commonApi.js 에 정의해도 된다.

const getAuthorization = () => {

    return `Bearer ${ sessionStorage.getItem("loginUser") }`;
};
// > 매번 요청 시점에서 sessionStroeage 로 부터 데이터를 꺼내올 수 있도록 함수 형태로

export { getAuthorization };