import { useRef, useState } from "react";

const DiaryItem = ({
    onEdit,
    onRemove,
    author,
    movie,
    contents,
    created_date,
    emotion,
    id
}) => {


    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(contents);
    const localcontentInput = useRef();
    
    const handleRemove = () => {
        if(window.confirm(`${author}님의 평론을 진짜 삭제할거임?`)){
            onRemove(id);
        }
    };

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(contents);
    };

    const handleEdit = () => {
        if(localContent.length < 5){
            localcontentInput.current.focus();
            return;
        }

        if(window.confirm(`${author}님의 평론을 정말로 수정할거임?`)){
            onEdit(id,localContent)
            toggleIsEdit();
        }
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자: {author} | 평가대상 영화: {movie} | 평가점수: {emotion}</span>
                <br/>
                <span className="date">
                    {new Date(created_date).toLocaleDateString()}
                </span>
            </div>
            <div className="content">
                {isEdit ? <><textarea ref={localcontentInput} value={localContent} onChange = {(e) => setLocalContent(e.target.value)}/></> : <>{contents}</>}
            </div>

            {isEdit ? <><button onClick={handleQuitEdit}>수정취소</button><button onClick = {handleEdit}>수정하기</button></> :
             <><button onClick={handleRemove}>삭제하기</button><button onClick={toggleIsEdit}>수정하기</button></>}
        </div>
    );
};

export default DiaryItem;