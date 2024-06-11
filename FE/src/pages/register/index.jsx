import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_login } from "../../API";
import { useSnackbar } from 'notistack';

function Register() {
    const navigate = useNavigate();
    const [err, seterr] = useState('')
    const [formLogin, setFormLogin] = useState({ email: "", password: "", displayName: "", confirmpassword: "" });
    const handleClick = (t) => {
        enqueueSnackbar(t);
    };

    const { enqueueSnackbar } = useSnackbar();
    const handleregister = async (e) => {
        e.preventDefault();

        try {
            if (formLogin.confirmpassword !== formLogin.password) {
                throw Error("confirmpassword is not match !");
            }

            const { confirmpassword, ...data } = formLogin

            const rs = await API_login.Register(data);
            console.log(rs)
            if (rs.data.statusCode === 201) {
                handleClick("Dang ki thanh cong!")
                setTimeout(() => {
                    navigate("/login");
                }, 500); // Đợi để hiện thông báo thành công
            } else {
                // Hiển thị thông báo lỗi
                throw Error("Dang ki that bai!");
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.message);
            handleClick(error.message)
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === 'confirmpassword' && formLogin.password === value) {
        //     console.log("looi")
        // }
        setFormLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <div className="  bg-gray-200 container h-dvh">
            <div className="Register w-1/2 m-auto ">
                <form className="" onSubmit={handleregister} >
                    <h1 className=" text-4xl pt-7 font-extrabold text-violet-500" >ĐĂNG KÝ</h1>
                    <ul>
                        <li>
                            <label className=" flex justify-start text-xl mt-7 font-extrabold text-violet-500" htmlFor="user">tài khoản</label>
                            <input
                                id="user"
                                className="outline-none block p-2 w-full mt-3 border-solid border-2 border-black rounded"
                                type="email"
                                placeholder="Tài khoản"
                                name="email"
                                value={formLogin.email}
                                onChange={handleChange}
                                required
                            />
                        </li>

                        <li>
                            <label className=" flex justify-start text-xl mt-7 font-extrabold text-violet-500" htmlFor="username"> tên người dùng </label>
                            <input
                                id="username"
                                name="displayName"
                                className=" block p-2 w-full mt-3 border-solid border-2  border-black rounded"
                                type="text"
                                value={formLogin.displayName}
                                onChange={handleChange}
                                placeholder="nhập tên người dùng" />
                        </li>
                        <li>
                            <label
                                className=" flex justify-start text-xl mt-7 font-extrabold text-violet-500"
                                htmlFor="password"> mật khẩu</label>

                            <input
                                id="password"
                                className="outline-none block p-2 w-full mt-3 border-solid border-2 border-black rounded"
                                placeholder=" Mật khẩu"
                                name="password"
                                value={formLogin.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />

                        </li>
                        <li>
                            <label
                                className=" flex justify-start text-xl mt-7 font-extrabold text-violet-500"
                                htmlFor="retype-password">nhập lại mật khẩu</label>

                            <input
                                className="outline-none block p-2 w-full mt-3 border-solid border-2 border-black rounded"
                                type="password"
                                placeholder="Mật khẩu"
                                name="confirmpassword"
                                value={formLogin.confirmpassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />

                        </li>
                    </ul>
                    <div className="flex justify-between">

                        <button
                            type="submit"
                            className="flex text-white  items-center justify-center w-1/4 bg-violet-500 p-2 mt-2 rounded">Đăng Ki</button>
                        <a className=" mt-3 text-xl" href="login">đăng nhập </a>

                    </div>
                    <button className="flex text-white  justify-center w-full bg-blue-500 p-2 mt-2 rounded text-center">
                        <i className=" text-2xl mr-8 fa-brands fa-google"></i>Đăng Ký Bằng GOOGLE
                    </button>

                </form>
            </div>
        </div >
    )
}
export default Register;