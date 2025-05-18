import React, { useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { LiaPowerOffSolid } from "react-icons/lia";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      localStorage.clear();
      document.cookie = "token_admin=; expires=now; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/acc-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));
      if (response.data.data.logout) {
        dispatch(logout());
        localStorage.clear();
        document.cookie = "token_admin=; expires=now; path=/;";
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      dispatch(logout());
      localStorage.clear();
      document.cookie = "token_admin=; expires=now; path=/;";
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <header className="left-[165px] h-[60px] bg-white transition-[left] duration-300 w-full md:px-[25px] px-[15px] justify-between sticky top-0 flex items-center z-99">
      <label for="menu-toggle" className="z-99 cursor-pointer" id="bar-admin">
        <HiMiniBars3 size={24} />
      </label>

      <div className="flex items-center z-[20] sm:gap-[25px] gap-[15px]">
        <div className="relative flex gap-[5px] text-[1rem]">{user.name}</div>

        {/*
   <div className="relative flex">
          <RxEnvelopeClosed size={21} />
          <span className="absolute bg-[#22baa0] h-4 w-4 flex justify-center items-center rounded-full -right-[7px] -top-[9px] text-white text-[0.8rem] font-medium">
            0
          </span>
        </div>

        <div className="relative flex">
          <LiaBell size={23} />
          <span className="absolute bg-[#22baa0] h-4 w-4 flex justify-center items-center rounded-full -right-[7px] -top-[9px] text-white text-[0.8rem] font-medium">
            0
          </span>
        </div>

  */}

        <div className="flex items-center">
          <button onClick={handleLogout}>
            <span className="flex ml-[0.3rem] text-[1rem] items-center gap-[5px] font-medium">
              <LiaPowerOffSolid size={24} />
              Đăng xuất
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
