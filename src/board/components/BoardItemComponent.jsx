import { useNavigate } from "react-router-dom";

function BoardItemComponent(props) {

    // 실행할 구문
    let navigate = useNavigate();

    // props = {item : {여기}};
    const item = props.item;

    // return 구문
    return (
        <tr onClick={ () => { navigate(`/board/detail/${ item.boardNo }`); } }>
            <td>{ item.boardNo }</td>
            <td>{ item.boardTitle }</td>
            <td>{ item.member.userId }</td>
            <td>{ item.count }</td>
            <td>{ item.createDate.substring(0, 10) }</td>
            <td>{ (item.originName != null) ? "★" : "" }</td>
        </tr>
    );
}

// 내보내기
export default BoardItemComponent;