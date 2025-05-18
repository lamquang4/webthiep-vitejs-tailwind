import React, { useState } from "react";
import Image from "./Image";
import { GoLock } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { setToken } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/login-admin`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          email: data.email.trim(),
          password: data.password.trim(),
        },
        withCredentials: true,
      });

      if (response.data.success) {
        navigate("/ad-qtv");
        dispatch(setToken(response?.data?.token));
        setData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <section className="bg-[#F9FAFB] w-full h-screen flex justify-center items-center flex-col gap-[30px] px-[15px]">
      <div className="">
        <Image
          Src={"/assets/other/logo.png"}
          Alt={""}
          ClassName={"w-[100px]"}
        />
      </div>
      <div className="relative max-w-[420px] w-full bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden mx-5">
        <div className="flex items-center h-[440px] w-[200%] transition-all duration-200 ease">
          <div className="w-1/2 md:px-8 px-6 bg-white transition-all duration-150 ease">
            <h2 className="relative text-[1.5rem] text-center font-semibold">
              Đăng nhập quản trị viên
            </h2>

            <form action="" onSubmit={handleSubmit}>
              <div className="relative h-12 w-full mt-8 focus-within:text-blue-500 text-[#999] font-medium">
                <AiOutlineMail
                  className="z-99 absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="absolute text-[0.9rem] h-full w-full px-8 outline-none border-b-2 border-gray-300 transition-all duration-200 focus:border-blue-500"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div className="relative h-12 w-full mt-8 focus-within:!text-blue-500 text-[#999] font-medium">
                <GoLock
                  className="z-99 absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 focus-within:text-blue-500"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="absolute text-[0.9rem] h-full w-full px-8 outline-none border-b-2 border-gray-300 transition-all duration-200 focus:border-blue-500"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <div className="mt-10">
                <button className="w-full text-[0.9rem] py-2 text-white font-medium tracking-wide rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
