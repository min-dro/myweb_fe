import { useNavigate } from "react-router-dom";

function MemberItemComponent(props) {

    // 실행할 구문
    let navigate = useNavigate();

    // console.log(props);
    // > props = {item : {userId : "~~~", userName : "~~~", ...}}
    
    const item = props.item;

    // return 구문
    return (
        <tr onClick={ () => { navigate(`/member/detail/${ item.userId }`); } }>
            <td>{ item.userId }</td>
            <td>{ item.userName }</td>
            <td>{ item.email }</td>
            <td>{ item.gender }</td>
            <td>{ item.age }</td>
            <td>{ item.enrollDate.substring(0, 10) }</td>
            <td>{ (item.status == "N") ? "탈퇴" : "-" }</td>
        </tr>
    );
}

// 내보내기
export default MemberItemComponent;