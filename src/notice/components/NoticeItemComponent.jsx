import { useNavigate } from "react-router-dom";

function NoticeItemComponent(props) {

    // 실행할 구문
    let navigate = useNavigate();
    
    const item = props.item;

    // return 구문
    return (
        <tr onClick={ () => { navigate(`/notice/detail/${ item.noticeNo }`); } }>
            <td>{ item.noticeNo }</td>
            <td>{ item.noticeTitle }</td>
            <td>{ item.member.userId }</td>
            <td>{ item.createDate.substring(0, 10) }</td>
        </tr>
    );
}

// 내보내기
export default NoticeItemComponent;