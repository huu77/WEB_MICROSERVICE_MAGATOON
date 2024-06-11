import { useState } from "react"
import { useGetCommentsQuery } from "../../features/api/apiSlice"
import CommentList from './../CommentList/index';

export default function Comment({ comment }) {
    const [isReplyDisplay, setReplyDisplay] = useState(false)
    const [getReplyQueries, setGetReplyQueries] = useState({
        chapterId: 6,
        isOldest: 0,
        page: 1,
        limit: 0
    })

    const { data: commentRepliesResponse, isSuccess } = useGetCommentsQuery(getReplyQueries)

    function handleReplyBtnClick(e) {
        setReplyDisplay(true)
        setGetReplyQueries({
            chapterId: comment.chapterId,
            parentId: comment.id,
            isOldest: 1,
            page: 1,
            limit: 10
        })
    }

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <img
                        className="w-[64px] h-[64px] object-cover object-center rounded-[50%]"
                        src="../../../public/imgs/avatar.jpg"
                        alt="Avatar"
                    />
                </div>

                <div className="grow ml-[8px]">
                    <div>
                        <div className="rounded-[12px] bg-[#f0f1f1] text-[#000] p-[12px]">
                            <div className="font-bold">Cường</div>

                            <div>{comment.content}</div>
                        </div>

                        <div className="space-x-2">
                            <span className="font-[400] opacity-80">5 giờ</span>
                            <span>
                                <span>10k</span>
                                <span className="ml-1 text-[#929596]">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </span>
                            </span>
                            <span>
                                <span>1k</span>
                                <span className="ml-1 text-[#929596]">
                                    <i class="fa-solid fa-thumbs-down"></i>
                                </span>
                            </span>
                            <span className="font-[500]">Phản hồi</span>
                        </div>
                    </div>


                    {comment.repliesCount > 0 && !isReplyDisplay
                        ?
                        (<div className="group/replyBtn mt-2">
                            <span className="rotate-180">
                                <i class="fa-solid fa-reply"></i>
                            </span>
                            <span
                                onClick={handleReplyBtnClick}
                                className="group-hover/replyBtn:underline group-hover/replyBtn:cursor-pointer group-hover/replyBtn:opacity-80 ml-2"
                            >
                                Xem {comment.repliesCount} phản hồi
                            </span>
                        </div>)
                        :
                        null
                    }

                    {comment.repliesCount > 0 && isSuccess
                        ?
                        <CommentList comments={commentRepliesResponse.data} />
                        :
                        null
                    }
                </div>
            </div>
        </div >
    )
}