import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Overplay from "./Overplay";
import { Link } from "react-router-dom";
import axios from "axios";
function Menumobile({ isOpen, toggleMenu }) {
  const [openMenus, setOpenMenus] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const toggleOpen = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

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

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/subcategories/${categoryId}`
      );
      if (response.data.success) {
        setSubCategories((prevState) => ({
          ...prevState,
          [categoryId]: response.data.data,
        }));
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full sm:max-w-[320px] max-w-[300px] h-screen p-5 bg-white shadow-md overflow-hidden overscroll-contain transition-all duration-500 ease-in-out z-[22] ${
          isOpen ? "right-0 visible" : "right-[-100%] invisible"
        }`}
      >
        <div className="mb-5 flex justify-end items-center">
          <button onClick={toggleMenu} className="flex">
            <HiMiniXMark size={30} color="black" />
          </button>
        </div>

        <ul className="mb-[30px]">
          <li className="border-b border-black/25">
            <Link
              to={"/"}
              className="text-black text-[0.9rem] font-medium py-4 uppercase"
            >
              Trang chủ
            </Link>
          </li>

          {categories.map((category) => (
            <li className="border-b border-black/25" key={category._id}>
              <div
                onClick={() => toggleOpen(`thiep${category.namecate}`)}
                onMouseEnter={() => fetchSubCategories(category._id)}
                className="w-full cursor-pointer flex justify-between items-center"
              >
                <p className="text-black text-[0.9rem] font-medium py-4 uppercase">
                  {category.namecate}
                </p>
                <button>
                  {openMenus[`thiep${category.namecate}`] ? (
                    <FaMinus className="text-[#3b3a3a]" size={15} />
                  ) : (
                    <FaPlus className="text-[#3b3a3a]" size={15} />
                  )}
                </button>
              </div>

              <ul
                className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out ${
                  openMenus[`thiep${category.namecate}`]
                    ? "max-h-fit visible"
                    : ""
                }`}
              >
                {subCategories[category._id] &&
                  subCategories[category._id].map((sub) => (
                    <li className="my-[10px]" key={sub._id}>
                      <Link
                        to={`/cards/${sub.slug}`}
                        className="py-[8px] text-[0.938rem] text-[#777777] font-medium hover:text-black"
                      >
                        {sub.namesubcate}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && <Overplay closeMenu={toggleMenu} IndexForZ={15} />}
    </>
  );
}

export default Menumobile;
