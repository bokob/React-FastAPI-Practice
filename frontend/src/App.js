import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let idx, receiveName;
  let [foodCount, setFoodCount]=useState(0);
  let [loading, setLoading]= useState(false);
  let [isFindFood, setIsFindFood] = useState(false)
  let [isSuccessWriteName, setIsSuccessWriteName] = useState(false);
  let [findName, setFindName] = useState();
  let [inputName, setInputName] = useState()


  async function GetName(idx){
    setLoading(true);
    let url = `http://127.0.0.1:8000/get/${idx}`
    const response = await fetch(url, {headers:{Accept: "application / json",},method:"GET"});
    receiveName = await response.json();
   // console.log(receiveName);
    findName = receiveName['name'];
   // console.log(findName)
    //console.log(response);
    setLoading(false);
    setIsFindFood(true);
    setFindName(findName);
  }

  async function WriteName(inputName){
    setLoading(true);
    let url = `http://127.0.0.1:8000/post/${inputName}`;
    const response = await fetch(url, {headers:{Accept: "application / json",}, method:"GET"});
    let writeResult = await response.json();
    console.log(writeResult);
    //console.log(response);
    setLoading(false);
    setIsSuccessWriteName(true);
    setInputName(inputName);
  }

  async function CheckCount(){
    let url = `http://127.0.0.1:8000/`
    const response = await fetch(url,{headers:{Accept: "application / json",}, method:"GET"});
    let count = await response.json();
    //console.log(count);
    setFoodCount(count);
  }

  console.log(findName);
  console.log(inputName);

  return (
    <div className="App">
      <h3>현재 DB에 있는 음식의 개수는 ( {foodCount} )개다.</h3>
      <div>
        이름조회(인덱스)
        <input type='text' onChange={(e)=>{
          idx = e.target.value
        }}/>
        <button onClick={()=>{
          GetName(idx);
          CheckCount();
          console.log('인덱스보냄');
        }}>조회</button>
      </div>

      <div>
        이름추가
        <input type='text' onChange={(e)=>{
            inputName = e.target.value;
        }}/>
        <button onClick={()=>{
          WriteName(inputName);
          console.log('이름보냄');
          setFoodCount(parseInt(foodCount)+1);
        }}>추가</button>
      </div>

      {loading ? <>로딩중</> : <></>}
      {isFindFood ? <h2>{findName} 찾았음</h2> : <></>}
      {isSuccessWriteName ? <h2><br/> {inputName} 성공적으로 추가함</h2> : <></>}
      
    </div>
  );
}

export default App;
