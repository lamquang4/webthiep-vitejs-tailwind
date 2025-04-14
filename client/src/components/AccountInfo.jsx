import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";
function AccountInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const userId = localStorage.getItem("userId");
  if (!userId) {
    navigate("/");
  }

  const [data, setData] = useState({
    name: user?.name,
    email: user?.email,
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user,
    }));
  }, [user]);

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
    };

    if (!isValidEmail(data.email)) {
      toast.error("Email không hợp lệ");
      return;
    }
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-acc`;
    try {
      const response = await axios.post(
        URL,
        {
          name: cleanedData.name,
          email: cleanedData.email,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log("Lỗi:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const cleanedData = {
      newPassword: data.newPassword.trim(),
      oldPassword: data.oldPassword.trim(),
    };

    if (cleanedData.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/changepass`;
    try {
      const response = await axios.post(
        URL,
        {
          oldPassword: cleanedData.oldPassword,
          newPassword: cleanedData.newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
        }));
      }
    } catch (error) {
      console.log("Lỗi:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="my-[40px] px-[15px]">
      <div className="mb-[40px]">
        <ul className="flex justify-center gap-8">
          <li className="relative">
            <Link className="text-black p-[5px_6px] text-[0.95rem] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[1.5px] after:bg-[#ff8669] after:scale-x-100 after:origin-left after:transition-transform after:duration-100 after:ease-in">
              Tài Khoản
            </Link>
          </li>

          <li className="relative">
            <Link
              to={"/mycard"}
              className="text-black p-[5px_6px] text-[0.95rem] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[1.5px] after:bg-[#ff8669] after:scale-x-0 after:origin-left after:transition-transform after:duration-100 after:ease-in  hover:after:scale-x-100"
            >
              Thiệp Của Tôi
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="menu-content-wrapper">
          <div className="border border-[#c7c9ca] p-4 w-full max-w-[740px] mx-auto rounded-md">
            <form action="" onSubmit={handleSubmit}>
              <h2 className="text-[1rem] font-medium mb-[20px] pb-[4px] border-b border-b-[#c7c9ca]">
                Thông tin tài khoản
              </h2>
              <div className="flex sm:gap-[25px] gap-[15px] flex-wrap">
                <div className="w-full max-w-[250px]">
                  <label htmlFor="" className="text-[0.9rem]">
                    Tên đăng nhập
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleOnChange}
                    maxLength={20}
                    required
                    className="text-[0.9rem] mt-[5px] p-[4px_7px] border border-[#c7c9ca] w-full outline-0 rounded-[5px] placeholder:text-black"
                  />
                </div>

                <div className="w-full max-w-[250px]">
                  <label htmlFor="" className="text-[0.9rem]">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    required={user.type === "user-google"}
                    disabled={user.type === "user-google"}
                    className="text-[0.9rem] mt-[5px] p-[4px_7px] border border-[#c7c9ca] w-full outline-0 rounded-[5px] placeholder:text-black"
                  />
                </div>
              </div>

              <button className="bg-white text-[#666] px-4 py-1 text-[0.9rem] border border-[#ccc] font-medium rounded-sm mt-5 hover:text-black hover:border-black">
                Lưu
              </button>
            </form>
          </div>
        </div>

        <div className="menu-content-wrapper">
          <div className="border border-[#c7c9ca] p-4 w-full max-w-[740px] mx-auto rounded-md">
            <form action="" onSubmit={handleChangePassword}>
              <h2 className="text-[1rem] font-medium mb-[20px] pb-[4px] border-b border-b-[#c7c9ca]">
                Thay đổi mật khẩu
              </h2>
              <div className="flex sm:gap-[25px] gap-[15px] flex-wrap">
                <div className="w-full max-w-[250px]">
                  <label htmlFor="" className="text-[0.9rem]">
                    Mật khẩu cũ
                  </label>
                  <input
                    name="oldPassword"
                    type="password"
                    value={data.oldPassword}
                    onChange={handleOnChange}
                    required
                    disabled={user.type === "user-google"}
                    className="text-[0.9rem] mt-[5px] p-[4px_7px] border border-[#c7c9ca] w-full outline-0 rounded-[5px] placeholder:text-black"
                  />
                </div>

                <div className="w-full max-w-[250px]">
                  <label htmlFor="" className="text-[0.9rem]">
                    Mật khẩu mới
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    value={data.newPassword}
                    onChange={handleOnChange}
                    required
                    disabled={user.type === "user-google"}
                    className="text-[0.9rem] mt-[5px] p-[4px_7px] border border-[#c7c9ca] w-full outline-0 rounded-[5px] placeholder:text-black"
                  />
                </div>
              </div>

              <button className="bg-white text-[#666] px-4 py-1 text-[0.9rem] border border-[#ccc] font-medium rounded-sm mt-5 hover:text-black hover:border-black">
                Lưu
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
