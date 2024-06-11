import { useGetGenreQuery } from "../../../../features/api/apiSlice"
import { Link } from 'react-router-dom';

export default function Genre() {

    const { data, isSuccess } = useGetGenreQuery()
    if (!isSuccess) {
        <div>loading....</div>
    }

    return (
        <li >
            <div className="hover:bg-slate-500 transition border-solid border-gray-500 border-r  p-3 relative group">Thể Loại<i className="fa-solid fa-caret-down"></i>
                <div className="drop-catagory z-10 hidden group-hover:block rop-rating absolute bg-white w-[800px] left-0 top-0 translate-y-12 ">
                    <div className="flex flex-wrap w-full  border-gray-500  border shadow-black shadow">
                        {isSuccess && data.data.map((val, index) => (
                            <Link key={index} className=' w-1/5 hover:bg-slate-200 text-sky-300 hover:text-sky-600 '>
                                <p>{val.name}</p>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </li>
    )
}