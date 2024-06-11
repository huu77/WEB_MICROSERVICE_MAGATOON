import { NavLink } from "react-router-dom";

function BtnViewManga() {
    return (
        <div className="flex my-4">
            <NavLink className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded mr-1 text-white'>đọc từ đầu </NavLink>
            <NavLink className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded mr-1 text-white'> đọc mới nhất </NavLink>
            <NavLink className='bg-red-700 hover:bg-red-500 p-2 rounded mr-1 text-white'> đọc tiếp <i className="fa-solid fa-chevron-right"></i></NavLink>
        </div>
    );
}

export default BtnViewManga;