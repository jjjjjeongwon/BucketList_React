// bucket.js
import {db} from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc ,deleteDoc } from "firebase/firestore";

// Actions =>액션타입만들기=> 액션 생성하기
const LOAD ="bucket/LOAD";
const CREATE = "bucket/CREATE"
const UPDATE = "bucket/UPDATE"
const DELETE  ="bucket/DELETE";

const initialState ={    //맨 처음에 가지고 있어야하는 초기값
    list:[

    {text : "영화관 가기" ,completed:false}, 
    {text : "매일 책읽기" ,completed:false}, 
    {text : "수영 배우기" ,completed:false}, 
    {text : "코딩하기" ,completed:false}, 
],
    // list: ["영화관 가기", "매일 책읽기", "수영 배우기", "코딩하기",],여기는 배열형태 딕셔너리로 바꿈
};
 

// Action Creators
export function loadBucket(bucket_list){
    return {type:LOAD, bucket_list};
}
export function createBucket(bucket){
    console.log("액션 생성!");
    return {type :CREATE, bucket}
}

export function updateBucket(bucket_index){
    return {type:UPDATE, bucket_index}
}

export function deleteBucket(bucket_index){
    console.log("지울 버킷 인덱스",bucket_index);
    return{type: DELETE, bucket_index};     //  bucket index는 그대로 넣을거니까 :없이 그값 그대로
}

//middlewares
export const loadBucketFB =()=>{

return async function (dispatch){       //서버에서 데이터 가져오니까 비동기 => async 붙여야함
    const bucket_data = await getDocs(collection(db,"bucket")); //getDocs데이터 다 끝고오기->어떤컬렉션에서?->db의 bucket이라는 컬렉션에서
    console.log(bucket_data);

    let bucket_list=[];

    bucket_data.forEach((b)=>{  //bucket데이터에 들어있는 하나하나가 b
        console.log(b.data());  // 알아볼수 있는 배열으로 꺼내기 위해 b.data()
        bucket_list.push({id:b.id,...b.data()});

    });

console.log(bucket_list);

dispatch(loadBucket(bucket_list));
};
}; 

export const addBucketFB =(bucket)=>{   //()안에거 받아옴
    return async function(dispatch){        //비동기는 async, await
        const docRef =await  addDoc(collection(db,"bucket"),bucket); //어느콜렉션(어떤파이어스토어,콜렉션이름),추가하고자하는데이터
        // const _bucket =await getDoc(docRef);
        const bucket_data ={id:docRef.id, ...bucket };
        console.log(bucket_data);
        
        dispatch(createBucket(bucket_data));
    }
}



// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "bucket/LOAD":{
            return {list: action.bucket_list};
        }
        case "bucket/CREATE": { 
            console.log("값을 바꿀거햐");
            const new_bucket_list =[...state.list, action.bucket];      //기존에 있던 배열, 새로운 데이터(여기서는 액션안에 있는 버킷임!)
            return {list :new_bucket_list};   //list랑 새로운 상태값(new~)이 추가된 배열이 들어가면 됨
        }

        case "bucket/UPDATE":{
        
            const new_bucket_list =state.list.map((l, idx)=>{
                console.log(l);
                if(parseInt(action.bucket_index)===idx){
                    return{...l, completed:true};
                }
                else{
                    return l;
                }
            })
            console.log({list : new_bucket_list});
        return {list : new_bucket_list};
        }
    // do reducer stuff
    case "bucket/DELETE" :{
        console.log(state, action);
        const new_bucket_list = state.list.filter((l, idx)=> {
            // console.log(parseInt(action.bucket_index) !== idx,parseInt(action.bucket_index ), idx);
            //형까지 맞는지 아닌지 확인하기 때문에 != 로바꾸거나 parseInt사용
            return parseInt(action.bucket_index) !==   idx;
        });
        
        return {list: new_bucket_list};     //  state(상태값)라서 배열의 형태로
    }
    default: return state;
    }
    }
