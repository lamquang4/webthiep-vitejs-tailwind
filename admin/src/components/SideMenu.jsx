import React from "react";
import { Link } from "react-router-dom";
import { LiaAddressCardSolid } from "react-icons/lia";
import { LiaUserAltSolid } from "react-icons/lia";
import { LiaClipboardListSolid } from "react-icons/lia";
import { LiaCalendarPlus } from "react-icons/lia";
import { useLocation } from "react-router-dom";
function SideMenu() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "!text-white" : "");
  return (
    <React.Fragment>
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="sidebar fixed h-full w-[165px] left-0 bottom-0 top-0 z-20 bg-[#34425A] transition-[left] duration-300">
        <div class="shadow-md bg-white h-[60px] flex justify-center items-center"></div>
        <div className="side-content h-[calc(100vh-60px)] overflow-auto">
          <div className="text-center py-[1.2rem]">
            <h2 className="text-white font-semibold text-[1.6rem]">AURA</h2>
          </div>

          <div className="side-menu">
            <ul className="text-center">
              <li>
                <Link
                  to={"/ad-qtv"}
                  className={`${isActive(
                    "/ad-qtv"
                  )} !flex flex-col items-center py-[1.2rem] text-[#899DC1] font-medium`}
                >
                  <LiaAddressCardSolid size={29} className="!block" />
                  <small>Quản trị viên</small>
                </Link>
              </li>
              <li>
                <Link
                  to={"/ad-nd"}
                  className={`${isActive(
                    "/ad-nd"
                  )} !flex flex-col items-center py-[1.2rem] text-[#899DC1] font-medium`}
                >
                  <LiaUserAltSolid size={29} className="!block" />
                  <small>Người dùng</small>
                </Link>
              </li>

              <li>
                <Link
                  to={"/ad-card"}
                  className={`${isActive(
                    "/ad-card"
                  )} !flex flex-col items-center py-[1.2rem] text-[#899DC1] font-medium`}
                >
                  <LiaClipboardListSolid size={29} className="!block" />
                  <small>Thiệp</small>
                </Link>
              </li>

              <li>
                <Link
                  to={"/ad-dm"}
                  className={`${isActive(
                    "/ad-dm"
                  )} !flex flex-col items-center py-[1.2rem] text-[#899DC1] font-medium`}
                >
                  <LiaCalendarPlus size={29} className="!block" />
                  <small>Danh mục cha</small>
                </Link>
              </li>

              <li>
                <Link
                  to={"/ad-subdm"}
                  className={`${isActive(
                    "/ad-subdm"
                  )} !flex flex-col items-center py-[1.2rem] text-[#899DC1] font-medium`}
                >
                  <LiaCalendarPlus size={29} className="!block" />
                  <small>Danh mục con</small>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SideMenu;
