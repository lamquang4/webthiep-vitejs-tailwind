import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Image from "./Image";
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="border-b-2 border-gray-200 py-[80px]">
        <div className="px-[15px] flex justify-center flex-wrap gap-x-[20px] gap-y-[30px]">
          <ul className="w-full lg:w-[calc(20%-16px)]">
            <li>
              <Image
                Src={"/assets/other/logo.png"}
                Alt={""}
                ClassName={"w-[80px]"}
              />
            </li>
          </ul>

          <ul className="w-full lg:w-[calc(20%-16px)]">
            <li>
              <h2 className="relative font-bold text-black text-[0.95rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                Chính sách
              </h2>
            </li>

            <li className="py-[8px]">
              <Link
                to="/"
                className="inline-block max-w-max text-[#707072] font-medium text-[0.95rem] hover:text-black"
              >
                Trang chủ
              </Link>
            </li>

            <li className="py-[8px]">
              <Link
                to="/cards"
                className="inline-block max-w-max text-[#707072] font-medium text-[0.95rem] hover:text-black"
              >
                Các thiệp chúc
              </Link>
            </li>
          </ul>

          <ul className="w-full lg:w-[calc(20%-16px)]">
            <li>
              <h2 className="relative font-bold text-black text-[0.95rem] uppercase mb-3 pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:w-[60px] after:h-[1.5px]">
                Theo dõi chúng tôi
              </h2>
            </li>

            <li>
              <ul className="flex justify-start items-center gap-3">
                <li className="py-[8px]">
                  <Link
                    className="inline-block max-w-max text-[#707072] font-medium hover:text-black"
                    to="/"
                    title="Instagram"
                  >
                    <FaInstagram size={25} />
                  </Link>
                </li>
                <li className="py-[8px]">
                  <Link
                    className="inline-block max-w-max text-[#707072] font-medium hover:text-black"
                    to="/"
                    title="Facebook"
                  >
                    <FaFacebookSquare size={25} />
                  </Link>
                </li>
                <li className="py-[8px]">
                  <Link
                    className="inline-block max-w-max text-[#707072] font-medium  hover:text-black"
                    to="/"
                    title="Youtube"
                  >
                    <IoLogoYoutube size={25} />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center py-[15px] mx-auto">
        <p className="text-[hsl(0,0%,47%)] text-[0.9375rem] font-medium capitalize">
          © 2024 Aura - Lam Dieu Quang
        </p>
      </div>
    </footer>
  );
}

export default Footer;
