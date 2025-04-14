import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";

function AdminEditDMContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [data, setData] = useState({
    namecate: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`
        );
        if (response.data.success) {
          setCategory(response.data.data);
          setData({
            namecate: response.data.data.namecate,
          });
        }
      } catch (error) {
        toast.error("Danh mục cha không tồn tại!");
        navigate("/ad-dm");
      }
    };

    fetchCategory();
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      namecate: data.namecate.trim(),
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`,
        cleanedData
      );
      if (response.data.success) {
        toast.success("Lưu thành công!");
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
              encType="multipart/form-data"
            >
              <h1 className="font-bold text-[1.85rem] text-[#74767d]">
                Chỉnh sửa danh mục cha
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
                  className="bg-teal-500 text-white text-[0.9rem] px-4 py-2 "
                >
                  Lưu
                </button>
                <Link
                  to="/ad-dm"
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

export default AdminEditDMContent;
