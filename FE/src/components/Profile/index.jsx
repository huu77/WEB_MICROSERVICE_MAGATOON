import { useState } from "react";
import {
  useGetProfileQuery,
  useGetWalletQuery,
} from "../../features/api/apiSlice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isShow,setShow] = useState(false)
  const handleClick = ()=>{
    setShow(!isShow)
  }
   const { data: dataProfile, isSuccess: isSuccessprofile } =
    useGetProfileQuery();
  const { data: dataWallet, isSuccess: isSuccesswallet } = useGetWalletQuery();
  const navigate = useNavigate();
  if (!isSuccessprofile) {
    return <div>loading...</div>;
  }

  const LogOutclick = () => {
    // Clear tokens from local storage or cookies
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // useEffect(() => {
    //     localStorage.setItem('accessToken', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJzdGF0dXMiOnRydWUsImlhdCI6MTcxNzU3NTI1OTc0MH0.Q6jkjWa_JVhOJUVTlSwHzioIBIpQU5o369_qAXnAsXmtI-R5ndJnUffWjUeF14_nFf-Djeju7ScRhZvPvvPJMuO-vAbJYlbvEV506rsVe-moRmBX1sNc9ZWvYiHAnNQEe7fgSb-0mHEeO4tiQBPVXBAFGNrGg5jLarGjR1WFVyilb0TO2nSkn1bpSfmuLoULijkItiQVpYJ5TvtpMbW5SI3eKBQrH39v-Z7BN9dB2gkwtDxWiqWa0glkv2EfxJaD7455DFjwgFWBtxpJSVPVL8nemlsHhFnfFCvVOp6_qcR1Kqph6b85_B9YCIvSrcCxOyaBPyUo5gmmYhPKKxDKOw');
    // }, []);
    // Redirect to login page or homepage
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <div className="group relative">
        <img
        onClick={handleClick}
          className="mr-4 w-[40px] h-[40px] rounded-[50%]"
          src={dataProfile.data.photoURL}
          alt="Profile"
        />
        <div className={`${isShow ? 'block' :'hidden'} absolute bg-white   shadow-lg shadow-black-500/50  text-black w-[200px] z-50`}>
        <div className="my-2 flex justify-start w-full hover:bg-blue-300 items-center px-2">
            <NavLink to={"#"}>
              <i className="fa-solid fa-book mr-1"></i>
              {dataProfile.data.displayName.toUpperCase()}
            </NavLink>
          </div>
          <div className="my-2 flex justify-start w-full hover:bg-blue-300 items-center px-2">
            <NavLink to={"#"}>
              <i className="fa-solid fa-book mr-1"></i>
              truyện theo dõi
            </NavLink>
          </div>
          <div>
          <button
            className="my-2 flex justify-start w-full hover:bg-blue-300 items-center px-2"
            onClick={LogOutclick}
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-1"></i>
            đăng xuất
          </button>
          </div>
          

          <NavLink
            className="my-2 flex justify-start w-full hover:bg-blue-300 items-center px-2"
            to={"/wallet"}
          >
            {isSuccesswallet ? dataWallet.data.balnce : null}
            {dataWallet && dataWallet.data.balance}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Profile;
