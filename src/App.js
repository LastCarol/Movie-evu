import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//https://jsonplaceholder.typicode.com/comments


function App() {
  const [data,setData] = useState([]);

  const dataId = useRef(0)

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    console.log(res);

    const initData = res.slice(0,40).map((e)=>{
      return {
        author : e.email,
        movie : e.name,
        contents : e.body,
        emotion : Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      }
    })
    setData(initData);
  };


  useEffect(()=> {
    getData();
  },[])
  

  const onCreate = (author,movie, contents, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      movie,
      contents,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem,...data]);
  };

  const onRemove = (targetId) =>{
    console.log(`${targetId} 가 삭제됨`);
    const newDiaryList = data.filter((e) => e.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((e) => e.id === targetId ? {...e, contents:newContent} : e)
    );
  };


  return (
    <BrowserRouter>
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onEdit= {onEdit} diaryList={data} onRemove = {onRemove} />
    </div>
    </BrowserRouter>
  );
}

export default App;
