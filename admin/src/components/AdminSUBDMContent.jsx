import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "./Image";

function AdminSUBDMContent() {
  const [subcategories, setSubCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getStoredItemsPerPage = () => {
    return parseInt(localStorage.getItem("amount-subdm"), 10) || 8;
  };
  const [itemsPerPage, setItemsPerPage] = useState(getStoredItemsPerPage);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  const handleDeleteSubCategory = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa danh mục con này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/subcategory/${id}`
      );
      if (response.data.success) {
        toast.success("Xóa danh mục con thành công!");
        const updatedSubCategories = subcategories.filter(
          (subcategory) => subcategory._id !== id
        );
        setSubCategories(updatedSubCategories);

        const remainingItemsInPage = updatedSubCategories.length % itemsPerPage;
        if (remainingItemsInPage === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-subcategories`
        );
        if (response.data.success) {
          const fetchedSubCategories = response.data.data;
          setSubCategories(fetchedSubCategories);

          const categoryIds = [
            ...new Set(fetchedSubCategories.map((sub) => sub.categories)),
          ];
          const fetchCategories = async () => {
            const categoryData = {};
            for (const id of categoryIds) {
              try {
                const categoryResponse = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`
                );
                if (categoryResponse.data.success) {
                  categoryData[id] = categoryResponse.data.data.namecate;
                }
              } catch (error) {
                console.error("Lỗi: ", error);
              }
            }
            setCategoryMap(categoryData);
          };
          fetchCategories();
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleItemPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10) || 12;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem("amount-subdm", newItemsPerPage);
  };

  const filteredSubCategories = subcategories.filter((subcategory) =>
    subcategory.namesubcate
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubCategories = filteredSubCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);

  return (
    <React.Fragment>
      <div className="main-content ml-[165px] w-[calc(100%-165px)] transition-all duration-[300ms]">
        <Header />

        <main>
          <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
            <h1 className="font-bold mb-[20px] text-[1.85rem] text-[#74767d]">
              Danh mục con ({filteredSubCategories.length})
            </h1>

            <Link
              to={"/ad-add-subdm"}
              className="bg-[#daf4f0] border-0 cursor-pointer text-[0.9rem] font-medium w-[90px] !flex p-[10px_12px] items-center justify-center gap-[5px] text-[#0ab39c] hover:bg-[#0ab39c] hover:text-white"
            >
              <IoMdAddCircle size={22} /> Thêm
            </Link>
          </div>

          <div className="shadow-sm bg-white rounded-[3px] w-full overflow-auto">
            <div className="p-[1.2rem] flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm tên..."
                  className="w-[150px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.8rem]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center">
                <span className="inline-block mr-[0.6rem] text-[0.9rem] text-[#666]">
                  Số lượng
                </span>
                <select
                  name=""
                  onChange={handleItemPerPageChange}
                  value={itemsPerPage}
                  className="w-[100px] h-[30px] border border-[#b0b0b0] inline-block px-[0.5rem] text-[#666] outline-none text-[0.9rem]"
                >
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>

            <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full">
              <thead>
                <tr className="bg-[#E9EDF2]">
                  <th className="pl-[1rem] text-left text-[#444] text-[0.9rem]">
                    Mã danh mục con
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Tên danh mục
                  </th>

                  <th className="text-left text-[#444] text-[0.9rem]">
                    Ngày thêm
                  </th>

                  <th className="text-left text-[#444] text-[0.9rem]">
                    Danh mục cha
                  </th>

                  <th className="p-[1rem_0] text-left text-[#444] text-[0.9rem]">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center p-[20px]">
                      <Loading />
                    </td>
                  </tr>
                ) : currentSubCategories.length > 0 ? (
                  currentSubCategories.map((subcategory) => (
                    <tr key={subcategory._id}>
                      <td className="pl-[1rem] py-[1rem] text-[#22baa0] font-semibold text-[0.9rem]">
                        {subcategory._id}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {subcategory.namesubcate}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {new Date(subcategory.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {categoryMap[subcategory.categories]}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        <div className="flex items-center gap-[15px]">
                          <Link to={`/ad-edit-subdm/${subcategory._id}`}>
                            <LiaEdit size={22} className="text-[#076ffe]" />
                          </Link>

                          <button
                            onClick={() =>
                              handleDeleteSubCategory(subcategory._id)
                            }
                          >
                            <VscTrash size={22} className="text-[#d9534f]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="w-full h-[70vh]">
                      <div className="flex flex-col justify-center items-center">
                        <Image
                          Src={"/assets/other/notfound1.png"}
                          Alt={""}
                          ClassName={"w-[180px]"}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default AdminSUBDMContent;
