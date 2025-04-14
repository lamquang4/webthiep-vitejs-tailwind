import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { LuDoorOpen } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/userSlice";
function ProfileMenu({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      localStorage.clear();
      document.cookie = "token_user=; expires=now; path=/;";
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  const user = useSelector((state) => state.user);
  return (
    <div
      className={`absolute top-[35px] right-[-10px] w-[210px] overflow-hidden z-20 transition-max-height duration-400 ease-in-out bg-white group-hover:max-h-[400px] shadow-md rounded-[6px] ${
        isOpen ? "max-h-[400px]" : "max-h-0"
      }`}
    >
      <div className="px-[15px]">
        <h2 className="text-[0.95rem] max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-center my-[15px] text-black">
          Xin chào, {user.name}
        </h2>

        <hr className="border-0 h-[1px] w-full bg-gray-300" />

        <Link
          to="/account"
          className="w-full justify-left items-center py-[15px]"
        >
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <HiOutlineUser size={20} />
            <p className="text-[0.95rem]">Thông tin tài khoản</p>
          </div>
        </Link>

        <Link to="/mycard" className="w-full justify-left py-[15px]">
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <FaEnvelopeOpenText size={19} />
            <p className="text-[0.95rem]">Thiệp của tôi</p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full justify-left py-[15px]"
        >
          <div className="!flex items-center gap-[8px] text-[#878a99]">
            <LuDoorOpen size={20} />
            <p className="text-[0.95rem]">Đăng xuất</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
