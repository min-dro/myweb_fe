import axios from "axios";

import { getAuthorization } from "../../common/api/commonApi";

// 공통 URL 변수 처리
const BASE_URL = "http://3.35.201.88:8006/myweb/notices"

// 공지사항 목록 조회용
const selectNoticeListApi = () => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 작성용
const insertNoticeApi = notice => {

    const response = axios({
        url : `${ BASE_URL }`,
        method : "post",
        data : notice,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 상세 조회용
const selectNoticeApi = noticeNo => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeNo }`,
        method : "get",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 수정용
const updateNoticeApi = (noticeNo, notice) => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeNo }`,
        method : "put",
        data : notice,
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

// 공지사항 삭제용
const deleteNoticeApi = noticeNo => {

    const response = axios({
        url : `${ BASE_URL }/${ noticeNo }`,
        method : "delete",
        headers : {
            Authorization : getAuthorization()
        }
    });

    return response;
};

export { selectNoticeListApi, insertNoticeApi, selectNoticeApi, updateNoticeApi, deleteNoticeApi };