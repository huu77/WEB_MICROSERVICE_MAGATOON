import { useGetTopStoryRatingDetailQuery } from "../../features/api/apiSlice";
import mangaDT from "../home/listmanga/mangaDT";
function Rating() {
    const { data, isFetching, isSuccess } = useGetTopStoryRatingDetailQuery({
        page: 1,
        limit: 10,
    })
    console.log('data', data)
    return (<div className="min-h-[80vh]">
        <div className="  flex  flex-wrap ">
            {mangaDT.map((mangaDT, index) => (
                <div key={index} className=' m-2 p-1  w-1/5 border-solid border-gray-500 border rounded '>
                    <div key={mangaDT.id}>
                        <div className=" relative">

                            <img src={mangaDT.img} alt="" />
                            <div className="flex justify-between text-xs bg-opacity-50 bg-slate-700 absolute w-full bottom-0 text-white " >
                                <span>{mangaDT.quantity_chapter} <i className="fa-solid fa-eye"></i></span>
                                <span>{mangaDT.quantity_cmt} <i className="fa-solid fa-comment"></i></span>
                                <span>{mangaDT.quantity_follower} <i className="fa-solid fa-heart"></i></span>
                            </div>
                        </div>
                        <h3>{mangaDT.name}</h3>
                        <p> chaptrer:{mangaDT.chapter}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>);
}

export default Rating;