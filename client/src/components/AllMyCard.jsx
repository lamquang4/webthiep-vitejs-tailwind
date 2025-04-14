import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { VscTrash } from "react-icons/vsc";
import { TbBrandMessenger } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import Image from "./Image";
function AllMyCard() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const userId = localStorage.getItem("userId");
  if (!userId) {
    navigate("/");
  }

  const handleDeleteCard = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cardsave/${id}`
      );
      if (response.data.success) {
        setCards(cards.filter((card) => card._id !== id));
        toast.success("Xóa thành công");
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cardsave-user/${user._id}`
        );
        if (response.data.success) {
          setCards(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchCards();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".btn-action")
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCopyLink = (id) => {
    const link = `${window.location.origin}/send/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Đã sao chép link");
      })
      .catch((error) => {});
  };

  return (
    <section className="my-[40px] px-[15px] bg-white">
      <div className="mb-[40px]">
        <ul className="flex justify-center gap-8">
          <li className="relative">
            <Link
              to={"/account"}
              className="p-[5px_6px] text-[0.95rem] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[1.5px] after:bg-[#ff8669] after:scale-x-0 after:origin-left after:transition-transform after:duration-100 after:ease-in hover:after:scale-x-100 text-black"
            >
              Tài Khoản
            </Link>
          </li>

          <li className="relative">
            <Link
              to={"/mycard"}
              className="p-[5px_6px] text-[0.95rem] after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[1.5px] after:bg-[#ff8669] after:scale-x-100 after:origin-left after:transition-transform after:duration-100 after:ease-in text-black"
            >
              Thiệp Của Tôi
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <div
          className="grid lg:grid-cols-3 w-full max-w-[950px] justify-center gap-[15px] grid-cols-2 lg:gap-[30px]"
          style={{ display: cards.length <= 0 ? "flex" : "grid" }}
        >
          {isLoading ? (
            <Loading />
          ) : cards.length > 0 ? (
            cards.map((card, index) => (
              <div
                key={card._id}
                className="flex flex-col justify-start gap-[12px] relative card-save"
              >
                <div className="relative flex flex-row justify-center items-center h-full max-h-[250px] bg-[#e1e4e7] rounded-[6px]">
                  <Link
                    to={`/design/${card._id}`}
                    className="h-full w-full !flex flex-col items-center justify-center px-[10px] py-[15px]"
                  >
                    <Image
                      Src={`${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                        card.idcard?.image
                      }`}
                      Alt={""}
                      ClassName={"max-w-full max-h-full"}
                    />
                  </Link>

                  <button
                    className="absolute top-[8px] right-[8px] w-[30px] h-[30px] p-[8px] bg-white flex justify-center items-center rounded-[4px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === card._id ? null : card._id
                      );
                    }}
                  >
                    <SlOptions size={18} />
                  </button>

                  {openDropdown === card._id && (
                    <div className="absolute top-[40px] right-[8px] bg-white shadow-md rounded-[6px] block z-10 menu p-0 w-[250px] max-w-[200px]">
                      <button className="p-[16px_14px] text-black text-[0.9rem] w-full">
                        <Link
                          className="!flex justify-start items-center gap-[8px]"
                          to={`/send/${card._id}`}
                        >
                          <FaRegEyeSlash size={20} /> Xem trước gửi thiệp
                        </Link>
                      </button>

                      <button
                        className="p-[16px_14px] text-black text-[0.9rem] w-full"
                        onClick={() => handleCopyLink(card._id)}
                      >
                        <Link className="!flex justify-start items-center gap-[8px]">
                          <MdOutlineContentCopy size={18} /> Sao chép link gửi
                        </Link>
                      </button>

                      <button
                        className="p-[16px_14px] text-black text-[0.9rem] w-full"
                        onClick={() => handleCopyLink(card._id)}
                      >
                        <Link
                          className="!flex justify-start items-center gap-[8px]"
                          to={"https://m.me/"}
                          target="_blank"
                        >
                          <TbBrandMessenger size={20} /> Chia sẻ Messenger
                        </Link>
                      </button>

                      <button
                        className="p-[16px_14px] text-black text-[0.9rem] w-full"
                        onClick={() => handleCopyLink(card._id)}
                      >
                        <Link
                          className="!flex justify-start items-center gap-[8px]"
                          to={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=Gửi thiệp`}
                          target="_blank"
                        >
                          <HiOutlineMail size={21} /> Chia sẻ Gmail
                        </Link>
                      </button>

                      <button
                        className="p-[16px_14px] text-black text-[0.9rem] w-full"
                        onClick={() => handleDeleteCard(card._id)}
                      >
                        <Link className="!flex justify-start items-center gap-[8px]">
                          <VscTrash size={20} /> Xóa thiệp lưu
                        </Link>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-[0.95rem] font-medium mb-[5px]">
                    {card.idcard?.namecard}
                  </h2>
                  <p className="text-[0.9rem]">
                    {new Date(card.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center h-[55vh] justify-center">
              <div className="text-center">
                <h2 className="text-[1.5rem] uppercase mb-[20px] font-semibold">
                  Chưa có thiệp nào
                </h2>
                <p className="text-[0.95rem] mb-[20px]">
                  Hãy chọn thiệp và viết những lời chúc <br /> cho người thân,
                  bạn bè của bạn
                </p>
                <div className="flex justify-center">
                  <Link
                    className="text-[0.9rem] p-[10px_14px] bg-[#2985ff] text-white w-[110px] font-medium"
                    to={"/shop"}
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllMyCard;
