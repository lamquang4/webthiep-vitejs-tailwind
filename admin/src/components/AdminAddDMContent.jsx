import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
function AdminAddDMContent() {
  const [data, setData] = useState({
    namecate: "",
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

    const cleanedData = {
      namecate: data.namecate.trim(),
    };
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/add-category`;

    try {
      const response = await axios.post(URL, cleanedData);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          namecate: "",
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
                Thêm danh mục cha
              </h1>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  name="namecate"
                  value={data.namecate}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="submit"
                  className="w-[75px] bg-teal-500 text-white text-[0.9rem] py-2 "
                >
                  Thêm
                </button>
                <Link
                  to="/ad-dm"
                  className="w-[75px] bg-red-500 text-white text-[0.9rem] py-2 text-center"
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

export default AdminAddDMContent;
