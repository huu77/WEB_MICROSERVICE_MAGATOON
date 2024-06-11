import { useGetStoryAuthorDetailQuery } from "../../../features/api/apiSlice";
import AuthorSkeleton from "./AuthorSkeleton";


function Author({ id }) {
    const { data: dataAuthor, isFetching: isFethchingAuthor, isSuccess: isSuccessAuthor } = useGetStoryAuthorDetailQuery({
        storyId: id,
    });
    if (isFethchingAuthor)
        return (
            <div><AuthorSkeleton /></div>
        )
    if (!dataAuthor || !dataAuthor.data || dataAuthor.data.length === 0) {
        return (
            <div>đang cập nhật</div>
        );
    } else {
        return (
            <div>
                {dataAuthor.data.map((item, index) => (

                    <React.Fragment key={index}>
                        {item.author.name}
                        {index !== dataAuthor.data.length - 1 && <span>, </span>}
                    </React.Fragment>
                ))}

            </div>
        );
    }
}

export default Author
