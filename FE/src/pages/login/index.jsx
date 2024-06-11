import { API_login } from "../../API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import InitializeFirebase from './../../firebase/firebase.config';

// Đảm bảo Firebase được khởi tạo
// InitializeFirebase();


const signInWithGoogle = async () => {

    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error('Lỗi đăng nhập Google:', error);
    }
};

function Login() {
    const navigate = useNavigate();
    const [err, seterr] = useState('')
    const [formLogin, setFormLogin] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const rs = await API_login.ApiLogin(formLogin); // Truyền email và mật khẩu vào đây
             
            if (rs.data.statusCode === 200) {
                // localStorage.removeItem('accessToken');
                localStorage.setItem("accessToken", rs.data.data.accessToken);
                localStorage.setItem("refreshToken", rs.data.data.refreshToken);
                setTimeout(() => {
                    navigate("/");
                }, 500); // Đợi để hiện thông báo thành công
            } else {
                // Hiển thị thông báo lỗi
                seterr('!Lỗi đăng nhập: email hoặc mật khẩu không đúng')
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const rs = await signInWithGoogle();
            console.log(rs, "rs")
            if (rs) {
                const accessToken = rs.user.accessToken;
                const loginResponse = await API_login.ApiLoginGG({ accessToken });
                if (loginResponse.status === 200) {
                    // localStorage.removeItem('accessToken');
                    localStorage.setItem("accessToken", loginResponse.data.data.accessToken);
                    localStorage.setItem("refreshToken", loginResponse.data.data.accessToken);
                    setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                        console.log(loginResponse.data.data.accessToken)
                    }, 500); // Đợi để hiện thông báo thành công
                } else {
                    // Hiển thị thông báo lỗi
                    seterr('Lỗi đăng nhập Google:');
                }
            } else {
            }
        } catch (error) {
            console.error('Lỗi đăng nhập Google:', error);
        }
    };

    return (
        <div className="bg-gray-200 container h-screen">
            <div className="login w-1/2 m-auto">
                <form className="" onSubmit={handleLogin}>
                    <h1 className="text-4xl pt-7 font-extrabold text-violet-500">
                        ĐĂNG NHẬP
                    </h1>
                    <ul>
                        <li>
                            <label className="flex justify-start text-xl mt-7 font-extrabold text-violet-500" htmlFor="user">
                                Tài khoản
                            </label>
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
                            <label className="flex justify-start text-xl mt-7 font-extrabold text-violet-500" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                className="outline-none block p-2 w-full mt-3 border-solid border-2 border-black rounded"
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                value={formLogin.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </li>
                    </ul>
                    <p className="text-red-600 h-[20px]">{err}</p>
                    <div className="flex justify-between">
                        <button
                            className="flex text-white block items-center justify-center w-1/4 bg-violet-500 p-2 mt-2 rounded"
                            type="submit"
                        >
                            Đăng Nhập
                        </button>
                        <a className="mt-3 text-xl" href="register">
                            Đăng ký
                        </a>
                    </div>

                </form>
                <button
                    onClick={handleGoogleLogin}
                    className="flex text-white justify-center w-full bg-blue-500 p-2 mt-2 rounded text-center"
                >
                    <i className="text-2xl mr-8 fa-brands fa-google"></i>Đăng Nhập Bằng GOOGLE
                </button>
            </div>
        </div>
    );
}

export default Login;
