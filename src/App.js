import React from 'react';
import BucketList from './BucketList';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Detail from './Detail';
import NotFound from './NotFound';
import { useDispatch } from 'react-redux';
import { loadBucketFB, addBucketFB } from './redux/modules/bucket';
import Progress from './Progress';

function App() {
  const [list, setList] = React.useState([
    '영화관 가기',
    '매일 책읽기',
    '수영 배우기',
  ]);
  const text = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  const addBucketList = () => {
    dispatch(addBucketFB({ text: text.current.value, completed: false }));
  };
  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Progress />
        <Line />
        <Routes>
          <Route path="/" element={<BucketList list={list} />} />
          <Route path="/detail/:index" element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        위로가기
      </button>
    </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;

  & > * {
    padding: 5px;
  }
  & input {
    border: 1px soild #888;
    width: 70%;

    margin-right: 10px;
  }
  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }
  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;
