import Comment from "../Comment";

export default function CommentList({ comments }) {
    // console.log(comments);

    return (
        <div className="space-y-4 mt-4">
            {comments.length > 0
                ?
                (comments.map(comment => (
                    <Comment comment={comment} />
                )))
                :
                null
            }
        </div>
    )
}