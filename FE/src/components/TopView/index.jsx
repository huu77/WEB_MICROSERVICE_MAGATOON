import { limit } from "firebase/firestore";
import { useGetTopStoryViewDetailQuery } from "../../features/api/apiSlice";
import TopViewSkeleton from "./TopViewSkeleton";
import { useEffect, useState } from "react";

export default function Topview() {
    const [todate, setTodate] = useState('');
    const [hasLogged, setHasLogged] = useState(false);

    useEffect(() => {
        if (!hasLogged) {
            const currentDate = new Date().toISOString();
            console.log("todate", currentDate);
            setTodate(currentDate);
            setHasLogged(true);
        }
    }, [hasLogged]);

    const { data, isSuccess } = useGetTopStoryViewDetailQuery({
        from: "1899-12-30T16:53:30.000Z",
        to: todate,
        // page: 1,
        // limit: 10
    });

    if (!isSuccess) {
        return (
            <div>
                <TopViewSkeleton />
            </div>
        );
    }

    return (
        <div className="topview w-1/3">
            <div className="mt-3 p-2 border-solid border-gray-500 border rounded">
                <ul className="flex justify-center bg-slate-300">
                    <li className="border-solid border-gray-500 border-r flex justify-center w-4/12">Top lượt xem</li>
                    <li className="border-solid border-gray-500 border-r flex justify-center w-4/12">Top đánh giá</li>
                    <li className="border-solid border-gray-500 border-r flex justify-center w-4/12">Top theo dõi</li>
                </ul>
                {data && data.data.map((item, index) => (
                    <div key={index} className="border-solid mt-3 pb-0 border-gray-500 border-b flex w-full">
                        <span className="p-3 text-xl flex items-center">{index + 1}</span>
                        <img className="h-16 flex justify-start rounded" src={`${import.meta.env.VITE_GATEWAY_DOMAIN}/story-api/${item.coverImageUrl}`} alt="" />
                        <div className="ml-5 w-full mr-4">
                            <p className="w-full line-clamp-1 text-[12px] text-left capitalize p-1">{item.title}</p>
                            <div className="flex justify-between w-auto">
                                <p>Cập nhật: {new Date(item.updatedAt).toLocaleString()}</p>
                                <span className="flex justify-end">
                                    {item.viewCount} <i className="fa-solid fa-eye mt-1 ml-1"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
