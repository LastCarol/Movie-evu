import {useRef, useState} from 'react';

const DiaryEditor = ({onCreate}) => {

    const authorInput = useRef();
    const contentsInput = useRef();
    const movieInput = useRef();


    const [state, setState] = useState({
        author: "",
        movie: "",
        contents: "",
        emotion: 1,
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = () => {
        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }

        if(state.movie.length < 1){
            movieInput.current.focus();
            return;
        }

        if(state.contents.length < 5){
            contentsInput.current.focus();
            return;
        }
        
        console.log(state);
        onCreate(state.author,state.movie, state.contents, state.emotion);
        alert('작성이 완료되었습니다');
        setState({
            author: "",
            movie: "",
            contents: "",
            emotion: 1,
        })
    }


    // const [author, setAthor] = useState("");
    // const [contents, setContents ] = useState("");

    return <div className="DiaryEditor">
        <h2>영화 평론</h2>
        <div>
            작성자: <input ref={authorInput} name='author' value = {state.author} onChange={handleChangeState}/>
        </div>
        <div>
            평가할 영화: <input ref={movieInput} name='movie' value ={state.movie} onChange={handleChangeState}></input>
        </div>
        <div>            
            <textarea ref={contentsInput} name= 'contents' value = {state.contents} onChange={handleChangeState} placeholder="평론 내용 입력하세요."/>
        </div>
        <div>
            평가점수: <select name ='emotion' value={state.emotion} onChange={handleChangeState} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}> 평론 작성하기</button>
        </div>
    </div>
}

export default DiaryEditor;