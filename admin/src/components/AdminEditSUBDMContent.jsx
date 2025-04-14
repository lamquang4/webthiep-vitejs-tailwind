import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
function AdminEditSUBDMContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [subcategory, setSubCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    namesubcate: "",
    categoryId: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/subcategory/${id}`
        );
        if (response.data.success) {
          setSubCategory(response.data.data);
          setData({
            namesubcate: response.data.data.namesubcate,
            categoryId: response.data.data.categories,
          });
        }
      } catch (error) {
        toast.error("Danh mục con không tồn tại!");
        navigate("/ad-subdm");
      }
    };

    fetchSubCategory();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-categories`
        );
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      namesubcate: data.namesubcate.trim(),
      categoryId: data.categoryId,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/subcategory/${id}`,
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
                Thêm danh mục con
              </h1>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.95rem] text-black">
                  Tên danh mục con
                </label>
                <input
                  type="text"
                  name="namesubcate"
                  value={data.namesubcate}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[0.95rem] text-black">
                  Danh mục cha
                </label>
                <select
                  name="categoryId"
                  value={data.categoryId}
                  onChange={handleOnChange}
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] outline-none"
                >
                  <option value="">Chọn danh mục cha</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.namecate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="submit"
                  className="bg-teal-500 text-white text-[0.9rem] px-4 py-2 "
                >
                  Lưu
                </button>
                <Link
                  to="/ad-subdm"
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

export default AdminEditSUBDMContent;
