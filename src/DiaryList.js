import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList, onRemove, onEdit}) => {
    return (
        <div className="DiaryList">
            <h2>평론 리스트</h2>
            <h4>{diaryList.length}개의 평론이 존재</h4>
        <div>
            {diaryList.map((e) => (
            <DiaryItem key={e.id} {...e} onRemove = {onRemove} onEdit = {onEdit}/>
        ))}
        </div>
        </div>
    );
};

export default DiaryList;