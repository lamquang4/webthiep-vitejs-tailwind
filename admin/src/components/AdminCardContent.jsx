import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Image from "./Image";
import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ImageViewer from "./ImageViewer";
function AdminCardContent() {
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const [subcategoryMap, setSubCategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getStoredItemsPerPage = () => {
    return parseInt(localStorage.getItem("amount-card"), 10) || 8;
  };
  const [itemsPerPage, setItemsPerPage] = useState(getStoredItemsPerPage);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageViewer(true);
  };

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  useEffect(() => {
    const storedStatus = localStorage.getItem("status-card");
    setStatusFilter(storedStatus !== null ? parseInt(storedStatus, 10) : null);
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-cards`
        );
        if (response.data.success) {
          setCards(response.data.data);
          const subcategoryIds = [
            ...new Set(response.data.data.map((sub) => sub.subcategories)),
          ];

          const fetchSubCategories = async () => {
            const subcategoryData = {};
            for (const id of subcategoryIds) {
              try {
                const subcategoryResponse = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/subcategory/${id}`
                );
                if (subcategoryResponse.data.success) {
                  subcategoryData[id] =
                    subcategoryResponse.data.data.namesubcate;
                }
              } catch (error) {
                console.error("Lỗi: ", error);
              }
            }
            setSubCategoryMap(subcategoryData);
          };
          fetchSubCategories();
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    const action = currentStatus === 0 ? "hiện" : "ẩn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} thiệp này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/card/${id}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        setCards((prevUsers) =>
          prevUsers.map((card) =>
            card._id === id ? { ...card, status: newStatus } : card
          )
        );
        toast.success(
          `${action.charAt(0).toUpperCase() + action.slice(1)} thành công`
        );
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  const handleDeleteCard = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa thiệp này không?",
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
        `${import.meta.env.VITE_BACKEND_URL}/api/card/${id}`
      );
      if (response.data.success) {
        toast.success("Xóa thiệp thành công!");
        const updatedCards = cards.filter((card) => card._id !== id);
        setCards(updatedCards);

        const remainingItemsInPage = updatedCards.length % itemsPerPage;
        if (remainingItemsInPage === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    if (status === null) {
      localStorage.removeItem("status-card");
    } else {
      localStorage.setItem("status-card", status);
    }
  };

  const handleItemPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem("amount-card", newItemsPerPage);
  };

  const filteredCards = cards
    .filter((card) =>
      card.namecard.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .filter((card) =>
      statusFilter === null ? true : card.status === statusFilter
    );

  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  return (
    <React.Fragment>
      <div className="main-content ml-[165px] w-[calc(100%-165px)] transition-all duration-[300ms]">
        <Header />

        <main>
          <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
            <h1 className="font-bold mb-[20px] text-[1.85rem] text-[#74767d]">
              Thiệp ({filteredCards.length})
            </h1>

            <Link
              to={"/ad-add-card"}
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
                  placeholder="Tìm kiếm tên thiệp..."
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
                    Mã thiệp
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Hình chính
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Hình phụ
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Tên thiệp
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Ngày thêm
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Danh mục con
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem] relative">
                    <span
                      onMouseOut={toggleDropdownMenu}
                      onMouseOver={toggleDropdownMenu}
                      className="py-[1rem] cursor-pointer flex items-center gap-[2px]"
                    >
                      Tình trạng <FaSortDown size={14} />
                      {openDropdownMenu && (
                        <div className="absolute bg-[#f9f9f9] z-10 top-[90%] left-0 min-w-[160px] shadow-sm font-medium">
                          <button
                            className={`text-black px-4 py-3 block w-full text-left ${
                              statusFilter === null ? "!bg-[#f4f4f4]" : ""
                            }`}
                            onClick={() => handleStatusFilter(null)}
                          >
                            Tất cả
                          </button>
                          <button
                            className={`text-black px-4 py-3 block w-full text-left ${
                              statusFilter === 1 ? "!bg-[#f4f4f4]" : ""
                            }`}
                            onClick={() => handleStatusFilter(1)}
                          >
                            Hiện
                          </button>
                          <button
                            className={`text-black px-4 py-3 block w-full text-left ${
                              statusFilter === 0 ? "!bg-[#f4f4f4]" : ""
                            }`}
                            onClick={() => handleStatusFilter(0)}
                          >
                            Ẩn
                          </button>
                        </div>
                      )}
                    </span>
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
                ) : currentCards.length > 0 ? (
                  currentCards.map((card) => (
                    <tr key={card._id}>
                      <td className="pl-[1rem] py-[1rem] text-[#22baa0] font-semibold text-[0.9rem]">
                        {card._id}
                      </td>
                      <td className="py-[1rem]">
                        <div
                          onClick={() =>
                            handleImageClick(
                              `${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/thiep/${card.image}`
                            )
                          }
                        >
                          {card.image && (
                            <Image
                              Src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/thiep/${card.image}`}
                              Alt={""}
                              ClassName={"w-[80px] cursor-pointer"}
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        <div
                          onClick={() =>
                            handleImageClick(
                              `${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/thiep/${card.image1}`
                            )
                          }
                        >
                          {card.image1 && (
                            <Image
                              Src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/thiep/${card.image1}`}
                              Alt={""}
                              ClassName={"w-[80px] cursor-pointer"}
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {card.namecard}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {new Date(card.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {subcategoryMap[card.subcategories]}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {card.status === 1 ? "Hiện" : "Ẩn"}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        <div className="flex items-center gap-[15px]">
                          <button
                            onClick={() =>
                              handleStatusToggle(card._id, card.status)
                            }
                          >
                            {card.status === 1 ? (
                              <FaRegEyeSlash
                                size={22}
                                className="text-[#74767d]"
                              />
                            ) : (
                              <MdOutlineRemoveRedEye
                                size={22}
                                className="text-[#74767d]"
                              />
                            )}
                          </button>
                          <Link to={`/ad-edit-card/${card._id}`}>
                            <LiaEdit size={22} className="text-[#076ffe]" />
                          </Link>
                          {card.status === 0 && (
                            <button onClick={() => handleDeleteCard(card._id)}>
                              <VscTrash size={22} className="text-[#d9534f]" />
                            </button>
                          )}
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

      {showImageViewer && (
        <ImageViewer
          imgSrc={selectedImage}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </React.Fragment>
  );
}

export default AdminCardContent;
