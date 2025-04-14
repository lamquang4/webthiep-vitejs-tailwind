import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { LiaEdit } from "react-icons/lia";
import { IoMdAddCircle } from "react-icons/io";
import { TbLock } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";
import { FaSortDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Image from "./Image";
function AdminQTVContent() {
  const [admins, setAdmins] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getStoredItemsPerPage = () => {
    return parseInt(localStorage.getItem("amount-qtv"), 10) || 8;
  };
  const [itemsPerPage, setItemsPerPage] = useState(getStoredItemsPerPage);

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  useEffect(() => {
    const storedStatus = localStorage.getItem("status-qtv");
    setStatusFilter(storedStatus !== null ? parseInt(storedStatus, 10) : null);
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    const currentUserId = user._id;

    if (id === currentUserId) {
      toast.error("Bạn không thể chặn tài khoản đang đăng nhập!");
      return;
    }

    const action = currentStatus === 1 ? "chặn" : "bỏ chặn";
    const result = await Swal.fire({
      title: `Xác nhận ${action}?`,
      text: `Bạn có chắc muốn ${action} quản trị viên này không?`,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === id ? { ...admin, status: newStatus } : admin
          )
        );
        toast.success(
          `${action.charAt(0).toUpperCase() + action.slice(1)} thành công`
        );
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-admins`
        );
        if (response.data.success) {
          setAdmins(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    if (status === null) {
      localStorage.removeItem("status-qtv");
    } else {
      localStorage.setItem("status-qtv", status);
    }
  };

  const handleItemPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10) || 12;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem("amount-qtv", newItemsPerPage);
  };

  const filteredAdmins = admins
    .filter((admin) =>
      admin.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .filter((admin) =>
      statusFilter === null ? true : admin.status === statusFilter
    );

  const toggleDropdownMenu = () => {
    setOpenDropdownMenu((prev) => !prev);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  return (
    <React.Fragment>
      <div className="main-content ml-[165px] w-[calc(100%-165px)] transition-all duration-[300ms]">
        <Header />

        <main>
          <div className="p-[1.3rem] px-[1.2rem] bg-[#f1f4f9]">
            <h1 className="font-bold mb-[20px] text-[1.85rem] text-[#74767d]">
              Quản trị viên ({filteredAdmins.length})
            </h1>

            <Link
              to={"/ad-add-qtv"}
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
                    Mã quản trị viên
                  </th>
                  <th className="text-left text-[#444] text-[0.9rem]">
                    Tên đăng nhập
                  </th>

                  <th className="text-left text-[#444] text-[0.9rem]">Email</th>

                  <th className="text-left text-[#444] text-[0.9rem]">
                    Ngày tạo
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
                            Bình thường
                          </button>
                          <button
                            className={`text-black px-4 py-3 block w-full text-left ${
                              statusFilter === 0 ? "!bg-[#f4f4f4]" : ""
                            }`}
                            onClick={() => handleStatusFilter(0)}
                          >
                            Chặn
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
                ) : currentAdmins.length > 0 ? (
                  currentAdmins.map((admin) => (
                    <tr key={admin._id}>
                      <td className="pl-[1rem] py-[1rem] text-[#22baa0] font-semibold text-[0.9rem]">
                        {admin._id}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {admin.name}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {admin.email}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {new Date(admin.createdAt).toLocaleDateString("en-GB")}
                      </td>

                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        {admin.status === 1 ? "Bình thường" : "Đã chặn"}
                      </td>
                      <td className="py-[1rem] text-[0.9rem] text-[#444]">
                        <div className="flex items-center gap-[15px]">
                          <button
                            onClick={() =>
                              handleStatusToggle(admin._id, admin.status)
                            }
                          >
                            {admin.status === 1 ? (
                              <TbLock size={22} className="text-[#74767d]" />
                            ) : (
                              <TbLockOpen
                                size={22}
                                className="text-[#74767d]"
                              />
                            )}
                          </button>
                          <Link to={`/ad-edit-qtv/${admin._id}`}>
                            <LiaEdit size={22} className="text-[#076ffe]" />
                          </Link>
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

export default AdminQTVContent;
