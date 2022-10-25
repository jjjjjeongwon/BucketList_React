import {createStore, combineReducers ,applyMiddleware, compose} from "redux";
import bucket from "./modules/bucket";
import thunk from "redux-thunk";


const middlewares =[thunk];
const rootReducer = combineReducers({bucket});          //리듀서 다 묶는
const enhancer =applyMiddleware(...middlewares)       //리듀서 말고 옵셔널하게 추가하는


const store=createStore(rootReducer, enhancer);           //스토어 만듦

export default store;              //만든 스토어를 내보내려는 식