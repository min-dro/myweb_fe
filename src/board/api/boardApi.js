import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

const BASE_URL = "http://3.35.201.88:8006/myweb/boards";

// 일반게시글 목록 조회용
const selectBoardListApi = cpage => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "get",
        params : {
            cpage : cpage
        },
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 검색용
const searchBoardListApi = (cpage, keyword) => {

    const response = axios({
        url : `${ BASE_URL }/search`,
        method : "get",
        params : {
            cpage : cpage,
            keyword : keyword
        },
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 작성용
const insertBoardApi = formData => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "post",
        data : formData,
        headers : {
            // 요청 시 설정값들이 있다면 headers 속성에 적는다.
            "Content-Type" : "multipart/form-data",
            // > 요청 시 전달값 중 첨부파일이 있을 경우 반드시 작성해야함!!
            //   (기존에는 form 태그의 enctype 속성으로 적어줬었음)
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 상세조회용 - 1 (진짜 상세조회 페이지에서 요청)
const selectBoardApi = boardNo => {

    const response = axios({
        url : `${ BASE_URL }/${ boardNo }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 상세조회용 - 2 (수정하기 페이지에서 요청)
const selectBoardFormApi = boardNo => {

    const response = axios({
        url : `${ BASE_URL }/${ boardNo }/form`,
        // Path Variable 값이 URL 주소 중간에 들어가도 된다.
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 수정용
const updateBoardApi = (boardNo, formData) => {

    const response = axios({
        url : `${ BASE_URL }/${ boardNo }`,
        method : "post", // "multipart/form-data" 는 무조건 POST 요청이여야만 함
        // > 수정 기능이더라도 요청 시 전달값 중에 첨부파일이 있다면, POST 로 보내야 한다!!
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data", // 요청 시 전달값에 첨부파일이 있음을 알려줌
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 일반게시글 삭제용
const deleteBoardApi = boardNo => {

    const response = axios({
        url : `${ BASE_URL }/${ boardNo }`,
        method : "delete",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
}

export { selectBoardListApi, searchBoardListApi, insertBoardApi, selectBoardApi, selectBoardFormApi, updateBoardApi, deleteBoardApi };
export { BASE_URL };