import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiUser, CiSearch } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import Menumobile from "./Menumobile";
import Overplay from "./Overplay";
import ProfileMenu from "./ProfileMenu";
import Image from "./Image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
function Header() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [openSearch, setOpenSearch] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClickSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cards?search=${searchQuery}`);
    }
  };

  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    if (menuMobileOpen) setMenuMobileOpen(false);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMenuMobileOpen(!menuMobileOpen);
    if (openSearch) setOpenSearch(false);
    if (profileMenuOpen) setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
    if (menuMobileOpen) setMenuMobileOpen(false);
    if (openSearch) setOpenSearch(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuMobileOpen(false);
        setOpenSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/acc-details`;
        const response = await axios({
          url: URL,
          withCredentials: true,
        });
        dispatch(setUser(response.data.data));
        if (response.data.data.logout) {
          dispatch(logout());
          document.cookie = "token_user=; expires=now; path=/;";
          localStorage.clear();
        }
      } catch (error) {
        console.log("error", error);
        dispatch(logout());
        document.cookie = "token_user=; expires=now; path=/;";
        localStorage.clear();
        navigate("/");
      }
    };
    fetchUserDetails();
  }, [user]);

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
    <React.Fragment>
      <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-[15]">
        {/* Desktop */}
        <div className="flex justify-between items-center w-full py-[20px] px-[15px] md:px-[20px] lg:px-[40px] relative">
          <Link to="/">
            <Image
              Src={"/assets/other/logo.png"}
              Alt={"logo"}
              ClassName={"w-[80px]"}
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-[30px] text-[1rem] font-[550]">
              <li className="relative">
                <Link
                  to="/"
                  className="text-black relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 text-[0.95rem]"
                >
                  Trang chủ
                </Link>
              </li>

              {categories.length > 0 &&
                categories.map((category) => (
                  <li
                    onMouseEnter={() => fetchSubCategories(category._id)}
                    key={category._id}
                    className="relative group"
                  >
                    <Link
                      to="/"
                      className="text-black relative after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-[1.5px] after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 text-[0.95rem]"
                    >
                      {category.namecate}
                    </Link>
                    {subCategories[category._id] &&
                      subCategories[category._id].length > 0 && (
                        <ul className="absolute font-light top-full left-0 w-[200px] bg-white p-2 translate-y-[12px] opacity-0 invisible transition-all duration-200 z-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-[10px] shadow-md">
                          {subCategories[category._id].map((sub) => (
                            <li key={sub._id} className="my-2">
                              <Link
                                to={`/cards/${sub.slug}`}
                                className="text-black text-[0.95rem] py-1 px-5 transition-all duration-200"
                              >
                                {sub.namesubcate}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="relative">
              <form onSubmit={handleClickSearch}>
                <input
                  type="text"
                  className="px-3 py-1.5 w-[145px] border border-gray-300 text-[0.8rem] tracking-[0.95px] bg-transparent outline-none"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="absolute top-1/2 right-[7px] transform -translate-y-1/2 text-black flex items-center"
                  type="submit"
                  title="Tìm kiếm"
                >
                  <CiSearch size={21} title="Tìm kiếm" />
                </button>
              </form>
            </div>

            {user.name ? (
              <div
                className="relative cursor-pointer group text-[0.95rem] tex.....................t-black"
                onMouseOver={toggleProfileMenu}
                onMouseOut={toggleProfileMenu}
              >
                <h2 className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-black">
                  {user.name}
                </h2>

                <ProfileMenu isOpen={profileMenuOpen} />
              </div>
            ) : (
              <div className="flex items-center gap-[15px] text-[0.95rem]">
                <Link to="/login" className="text-black">
                  Đăng nhập
                </Link>
                <div className="w-[1px] h-[15px] bg-slate-300"></div>
                <Link to="/register" className="text-black">
                  Đăng kí
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <div
            className={`absolute left-0 w-full p-[10px_12px] bg-white border-y-[1.2px] border-gray-300 transition-all duration-300 overflow-hidden ${
              openSearch
                ? "opacity-100 visible top-[65px]"
                : "opacity-0 invisible top-[90px]"
            }`}
          >
            <div className="flex items-center">
              <form className="w-full" onSubmit={handleClickSearch}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-2 py-2 rounded outline-none"
                />
              </form>
              <button type="button" onClick={toggleSearch} title="Đóng">
                <HiMiniXMark size={23} title="Đóng" />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-4 relative">
            <button
              onClick={toggleSearch}
              className="text-black"
              title="Tìm kiếm"
            >
              <CiSearch size={24} title="Tìm kiếm" />
            </button>

            {user.name ? (
              <div
                className="relative cursor-pointer group text-[0.95rem]"
                onMouseOver={toggleProfileMenu}
                onMouseOut={toggleProfileMenu}
              >
                <h2 className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-black">
                  {user.name}
                </h2>

                <ProfileMenu isOpen={profileMenuOpen} />
              </div>
            ) : (
              <Link to="/login" className="text-black">
                <CiUser size={24} />
              </Link>
            )}

            <button
              onClick={toggleMobileMenu}
              className="text-black"
              title="Mở menu"
            >
              <AiOutlineMenu size={24} title="Mở menu" />
            </button>
          </div>
        </div>
      </header>

      <Menumobile isOpen={menuMobileOpen} toggleMenu={toggleMobileMenu} />
      {openSearch && <Overplay closeMenu={toggleSearch} IndexForZ={12} />}
    </React.Fragment>
  );
}

export default Header;
