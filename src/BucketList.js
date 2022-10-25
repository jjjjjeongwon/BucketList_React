// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const BucketList = (props) => {
    const navigate = useNavigate();
// console.log(props); 
// const my_lists = props.list;         //요곤 앱에서 데이터 받아와서 보여주는거
const my_lists =useSelector((state) => state.bucket.list);  //((전체데이터)=>리턴되는 값)  우리가 원하는건 버킷에 모듈의 리스트값
//요건 리듀서에서 받아와서 보여주는 !!
console.log(my_lists);



return (
<ListStyle>
{my_lists.map((list, index) => {
return (
<ItemStyle completed={list.completed} className="list_item" key={index} onClick={() => {
    navigate("/detail/"+index);        //클릭했을 때 이동하는곳
}}>
    
{list.text} 
</ItemStyle>
);
})}
</ListStyle>
);
};

const ListStyle = styled.div`
display: flex;
flex-direction: column;
height: 50vh;
overflow-x: hidden;
overflow-y: auto;
max-height:50vh;

`;

const ItemStyle = styled.div`
padding: 16px;
margin: 8px;
color: ${(props)=>props.completed? "#fff":"#333"};
background-color:${(props)=> props.completed? " #673ab7":"aliceblue"};
`;

export default BucketList;