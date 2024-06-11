import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Profile from './../Profile/index';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if tokens are present in local storage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        }
    }, );

    return (
        <div className="flex justify-center py-2 bg-[url('../../../public/imgs/header_bg.jpg')]">
            <div className="container flex justify-between items-center">
                <NavLink href="/" className="logo w-[80px]">
                    <img src="../../../public/imgs/logo.png" alt="Logo" />
                </NavLink>
                <div className="search flex">
                    <input type="search" placeholder="Tìm kiếm truyện..." className='block outline-none border-0 min-w-[320px] h-[30px] rounded-[2px] px-2 py-1 text-[1rem]' />
                    <button className="w-[28px] h-[30px] bg-white border-0">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                {isLoggedIn ? (
                    <div className="profile"><Profile /></div>
                ) : (
                    <div className="flex justify-between text-white login">
                        <NavLink className='mr-2 opacity-80 hover:opacity-100 transition' to="/login" >Đăng Nhập</NavLink>/
                        <NavLink className='ml-3 opacity-80 hover:opacity-100 transition w-fu' to="/register">Đăng Ký</NavLink>
                    </div>
                )}
            </div>
        </div >
    );
}
