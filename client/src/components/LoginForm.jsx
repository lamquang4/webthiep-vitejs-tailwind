import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DifferentLR from "./DifferentLR";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
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
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/login`;

    try {
      const response = await axios({
        method: "POST",
        url: URL,
        data: {
          email: cleanedData.email,
          password: cleanedData.password,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        navigate("/");
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
    <section className="my-[55px] bg-white">
      <div className="flex flex-col items-center justify-center px-[15px]">
        <div className="w-full bg-white md:mt-0 max-w-sm xl:p-0">
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-semibold sm:text-[2rem] text-[1.8rem] uppercase mb-[20px] text-center text-black">
              Đăng nhập
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action=""
            >
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] text-black"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-black placeholder:text-black"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] text-black"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Nhập mật khẩu"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-black placeholder:text-black"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-[0.9rem] font-light text-[#2196f3]"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button
                type="submit"
                className="text-[0.9rem] w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng nhập
              </button>
              <p className="flex gap-1.5 justify-center font-light text-[0.9rem] text-black">
                Bạn chưa có tài khoản ư?
                <Link to="/register" className="text-[#2196f3]">
                  Đăng kí
                </Link>
              </p>

              <DifferentLR title={"đăng nhập"} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
