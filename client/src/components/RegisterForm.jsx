import React, { useState } from "react";
import DifferentLR from "./DifferentLR";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
function RegisterForm() {
  const [data, setData] = useState({
    name: "",
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

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    if (!isValidEmail(cleanedData.email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (cleanedData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, cleanedData);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="my-[55px] bg-white">
      <div className="flex flex-col items-center justify-center px-[15px]">
        <div className="w-full bg-white md:mt-0 max-w-sm xl:p-0">
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-semibold sm:text-[2rem] text-[1.8rem] uppercase mb-[20px] text-center text-black">
              Đăng kí
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div className="mb-[15px]">
                <label
                  htmlFor=""
                  className="block mb-2 text-[0.9rem] text-black"
                >
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  maxLength={20}
                  onChange={handleOnChange}
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#e5e5e5] placeholder:text-[#e5e5e5]"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
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
                  className="text-[0.9rem] block w-full px-3 py-2 border border-[#e5e5e5] text-[#e5e5e5] placeholder:text-[#e5e5e5]"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div className="mb-[25px]">
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

              <button
                type="submit"
                className="w-full text-[0.9rem] bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Đăng kí
              </button>
              <p className="flex gap-1.5 justify-center font-light text-[0.9rem] text-black">
                Bạn đã có tài khoản?
                <Link to="/login" className="text-[#2196f3]">
                  Đăng nhập
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

export default RegisterForm;
