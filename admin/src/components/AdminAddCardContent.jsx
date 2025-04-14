import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
import Image from "./Image";
import ImageViewer from "./ImageViewer";
function AdminAddCardContent() {
  const [data, setData] = useState({
    namecard: "",
    content: "",
    subcategoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [subImage, setSubImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageViewer(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "categoryId") {
      setData((prev) => ({ ...prev, subcategoryId: "" }));

      if (value) {
        fetchSubCategories(value);
      } else {
        setSubCategories([]);
      }
    }
  };

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/webp")
    ) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    } else {
      toast.error("HÌnh chỉ chấp nhận định dạng PNG, Webp, JPEG");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxSize = 800 * 1024;
    const mainFile = document.getElementById("main-image").files[0];
    const subFile = document.getElementById("sub-image").files[0];

    if (!mainImage) {
      toast.error("Hình mặt trước là bắt buộc");
      return;
    }

    if (mainFile.size > maxSize) {
      toast.error("Hình mặt trước không được vượt quá 500KB");
      return;
    }

    if (subFile && subFile.size > maxSize) {
      toast.error("Hình mặt sau không được vượt quá 500KB");
      return;
    }

    const formData = new FormData();
    formData.append("namecard", data.namecard.trim());
    formData.append("content", data.content);
    formData.append("subcategoryId", data.subcategoryId);
    formData.append(
      "mainImage",
      document.getElementById("main-image").files[0]
    );
    formData.append("subImage", document.getElementById("sub-image").files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-card`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          namecard: "",
          content: "",
          subcategoryId: "",
        });
        setMainImage(null);
        setSubImage(null);
        document.getElementById("main-image").value = "";
        document.getElementById("sub-image").value = "";
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/subcategories/${categoryId}`
      );
      if (response.data.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-categories-status-1`
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
                Thêm thiệp
              </h1>

              <div className="flex flex-col gap-1">
                <label htmlFor="namecard" className="text-[0.95rem] text-black">
                  Tên thiệp
                </label>
                <input
                  type="text"
                  name="namecard"
                  value={data.namecard}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] w-full outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="main-image"
                  className="text-[0.95rem] text-black"
                >
                  Hình mặt trước thiệp
                </label>
                <input
                  type="file"
                  accept=".png,.webp,.jpeg"
                  id="main-image"
                  name="mainImage"
                  onChange={(e) => handleImageChange(e, setMainImage)}
                  required
                  className="block text-[0.9rem] text-black
        file:me-2 file:py-2 file:px-2
        file:rounded-md file:border-0
        file:text-[0.8rem] file:font-medium  
        file:bg-blue-500 file:text-white
        hover:file:bg-blue-600
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-400
        dark:hover:file:bg-blue-400"
                />

                {mainImage && (
                  <div onClick={() => handleImageClick(mainImage)}>
                    <Image
                      Src={mainImage}
                      ClassName={
                        "mt-3 max-w-[160px] object-cover cursor-pointer"
                      }
                      Alt={""}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="sub-image"
                  className="text-[0.95rem] text-black"
                >
                  Hình mặt sau thiệp
                </label>
                <input
                  type="file"
                  accept=".png,.jpeg,.webp"
                  id="sub-image"
                  name="subImage"
                  onChange={(e) => handleImageChange(e, setSubImage)}
                  className="block text-[0.9rem] text-black
                  file:me-2 file:py-2 file:px-2
                  file:rounded-md file:border-0
                  file:text-[0.8rem] file:font-medium  
                  file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600
                  file:disabled:opacity-50 file:disabled:pointer-events-none
                  dark:text-neutral-500
                  dark:file:bg-blue-400
                  dark:hover:file:bg-blue-400"
                />
                {subImage && (
                  <div onClick={() => handleImageClick(subImage)}>
                    <Image
                      Src={subImage}
                      ClassName={
                        "mt-3 max-w-[160px] object-cover cursor-pointer"
                      }
                      Alt={""}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-[0.95rem] text-black">
                  Nội dung
                </label>
                <textarea
                  name="content"
                  value={data.content}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] resize-y min-h-[140px] max-h-[200px] outline-none"
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

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="subcategoryId"
                  className="text-[0.95rem] text-black"
                >
                  Danh mục con
                </label>
                <select
                  name="subcategoryId"
                  value={data.subcategoryId}
                  onChange={handleOnChange}
                  required
                  className="border border-gray-400 px-2 py-1 text-[0.9rem] outline-none"
                >
                  <option value="">Chọn danh mục con</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.namesubcate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  type="submit"
                  className="w-[75px] bg-teal-500 text-white text-[0.9rem] py-2 "
                >
                  Thêm
                </button>
                <Link
                  to="/ad-card"
                  className="w-[75px] bg-red-500 text-white text-[0.9rem] py-2 text-center"
                >
                  Trở về
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>

      {showImageViewer && (
        <ImageViewer
          imgSrc={selectedImage}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </React.Fragment>
  );
}

export default AdminAddCardContent;
