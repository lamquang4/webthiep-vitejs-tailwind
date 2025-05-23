import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
function AdminAddQTVContent() {
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

    if (cleanedData.password.length > 0 && cleanedData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register-admin`;

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
    <React.Fragment>
      <div className="main-content ml-[165px] w-[calc(100%-165px)] transition-all duration-300">
        <Header />
        <main>
          <div className="py-[30px] sm:px-[25px] px-[15px]">
            <form
              className="flex flex-col gap-6 w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="font-bold text-[1.85rem] text-[#74767d]">
                Thêm quản trị viên
              </h1>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Tên người dùng
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  maxLength={20}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-teal-500 text-white text-[0.9rem] px-4 py-2 "
                >
                  Thêm
                </button>
                <Link
                  to="/ad-qtv"
                  className="bg-red-500 text-white text-[0.9rem] px-4 py-2 "
                >
                  Trở về
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default AdminAddQTVContent;
