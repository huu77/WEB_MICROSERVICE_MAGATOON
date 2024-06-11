import { Link } from "react-router-dom";
import Genre from "./components/Genre";

export default function Navigation() {
    return (
        <div className="  bg-slate-300 ">
            <div className="container">
                <nav>
                    <ul className="flex  ">
                        <li className="hover:bg-slate-500 transition border-solid border-gray-500 border-r p-3">
                            <Link href="">
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </li>

                        <li href="hot">
                            <Link to={"history"}
                                className="hover:bg-slate-500 transition border-solid border-gray-500 border-r p-3  flex items-center">HOT</Link>
                        </li>

                        <li >
                            <Link
                                to={"follow"}
                                className="hover:bg-slate-500 transition border-solid border-gray-500 border-r p-3  flex items-center">Theo Dõi</Link>
                        </li>

                        <li to="/history">
                            <Link
                                to={"history"}
                                className="hover:bg-slate-500 transition border-solid border-gray-500 border-r p-3  flex items-center"
                            >Lịch Sử</Link>
                        </li>

                        <Genre />

                        <li className="relative rating-item hover:bg-gray-600 transition border-r border-gray-500 border-r p-3 group ">Xếp Hạng <i className="fa-solid fa-caret-down  top-0 "></i>
                            <div className=' z-10 group-hover:block rop-rating absolute hidden bg-white w-80 left-0 top-0 translate-y-12'>
                                <nav>
                                    <ul className=' shadow-black shadow flex flex-wrap border-gray-500  border'>
                                        <Link className='w-1/2  flex justify-start px-2 py-1 hover:bg-slate-200' href="">
                                            <li > <i className="fa-solid fa-eye"></i>Top All</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200 ' href="">
                                            <li>Top Tháng</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li>Top Tuần</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li>Top Ngày</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li>Số Chapter</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li><i className="fa-solid fa-chart-simple"></i>Truyện Full</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li> <i className="fa-solid fa-thumbs-up"></i>Yêu Thích</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li><i className="fa-solid fa-retweet"></i>Mới Cập Nhật</li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li ><i className="fa-solid fa-cloud-arrow-up"></i>Truyện Mới </li>
                                        </Link><Link className='w-1/2  flex justify-start px-2 py-1  hover:bg-slate-200' href="">
                                            <li><i className="fa-solid fa-comment"></i>Bình Luận</li>
                                        </Link>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}