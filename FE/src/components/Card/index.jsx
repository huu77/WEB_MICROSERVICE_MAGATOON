import { Link } from "react-router-dom"
import { useGetChaptersQuery } from "../../features/api/apiSlice"
import Chapter from "./components/Chapter"

export default function Card({ story }) {
    const { data, isSuccess } = useGetChaptersQuery({
        storyId: story.id,
        page: 1,
        limit: 3,
    })
    return (
        <Link
            className="block relative"
            to={`/story/${story.id}`}
        >
            <div className='h-[340px] shadow-sm shadow-gray-300 rounded-[6px] overflow-hidden'>
                <div className="relative">
                    <img
                        className='w-full h-[200px] object-cover object-center'
                        src={`${import.meta.env.VITE_GATEWAY_DOMAIN}/story-api/${story.coverImageUrl}`}
                        alt="Thumbnail"
                    />
                    <div className="flex justify-between text-xs bg-opacity-50 bg-slate-700 absolute w-full bottom-0 text-white p-1" >
                        <span><i className="fa-solid fa-eye mr-[4px]"></i>18K</span>
                        <span><i className="fa-solid fa-comment mr-[4px]"></i>20M</span>
                        <span><i className="fa-solid fa-heart mr-[4px]"></i>5K</span>
                    </div>
                    <div className=" absolute top-0 right-0 bg-[#8a8080de] text-yellow-400 p-1 rounded-bl-[6px]">
                        FREE
                    </div>
                </div>

                <div className="p-2 pt-0">
                    <h3 className="line-clamp-1 text-left capitalize p-1 font-[600] text-[16px]">{story.title}</h3>

                    {isSuccess
                        ?
                        data.data.chapters.map(chapter => (
                            <Chapter
                                key={chapter.id}
                                chapter={chapter}
                                fontsize={'text-[15px]'}
                                justify={'between'}
                            />
                        ))
                        :
                        null
                    }
                </div>
            </div>
        </Link>
    )
}