import React from "react";
import {useParams} from "react-router-dom";      //app.js에서 index를 가져오기 위해서!! 주소의
import {useSelector, useDispatch} from "react-redux";   
import {deleteBucket, updateBucket} from "./redux/modules/bucket";    //deleteBucket을 import해올거다 "어떤 경로로"
import {useNavigate}from "react-router-dom";

const Detail = (props) => {
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const params = useParams();
    const bucket_index= params.index; //params 를 가져와서 그것의 인덱스 값을 버킷인덱스!
    const bucket_list = useSelector((state) => state.bucket.list); //state의 bucket안에있는 list가져온다
    
    console.log(bucket_list[bucket_index]) ;//{index: } 요기에서 index값 가져오는!!
    return (
        <div>
        <h1>{bucket_list[bucket_index].text}</h1>
        <button onClick={()=> {
            dispatch(updateBucket(bucket_index));
        }}>완료하기</button>
        <button onClick={()=> {                     //요렇게 화살표 함수로 넣을수동 아니면 const delete이런식으로 따로 만ㄷ글어줘도 오키
        console.log("삭제하기 버튼을 눌렀어!");
        dispatch(deleteBucket(bucket_index));
        navigate(-1);

         } }>삭제하기</button>
        </div>
    )
}

export default Detail;