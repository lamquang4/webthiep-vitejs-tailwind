import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";

function AdminEditNDContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`
        );
        if (response.data.success) {
          setUser(response.data.data);
          setData({
            name: response.data.data.name,
            email: response.data.data.email,
            type: response.data.data.type,
          });
        }
      } catch (error) {
        toast.error("Người dùng không tồn tại!");
        navigate("/ad-nd");
      }
    };

    fetchUser();
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password ? data.password.trim() : "",
    };

    if (!isValidEmail(cleanedData.email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (cleanedData.password !== "") {
      if (cleanedData.password.length > 0 && cleanedData.password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`,
        cleanedData
      );
      if (response.data.success) {
        toast.success("Lưu thành công!");

        setData((prev) => ({
          ...prev,
          password: "",
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
                Chỉnh sửa người dùng
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
                  required={data.type === "user-google"}
                  disabled={data.type === "user-google"}
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  disabled={data.type === "user-google"}
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-teal-500 text-white text-[0.9rem] px-4 py-2 "
                >
                  Lưu
                </button>
                <Link
                  to="/ad-nd"
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

export default AdminEditNDContent;
