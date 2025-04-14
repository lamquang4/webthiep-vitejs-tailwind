import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

function HomeCollection() {
  return (
    <section className="mt-[60px] sm:mt-[65px] px-[15px] bg-white">
      <h2 className="text-center mb-[50px] capitalize font-semibold sm:text-[2rem] text-[1.8rem] text-black">
        Các Mẫu Thiệp
      </h2>
      <div className="w-full flex justify-center flex-wrap gap-[60px]">
        <div className="bg-[#f4e2d5] w-full max-w-[500px] p-[30px] rounded-lg">
          <div className="mb-[30px]">
            <h2 className="mb-[12px] uppercase font-medium text-[1.5rem] text-black">
              Thiệp Sinh Nhật
            </h2>

            <Link
              className="border border-black p-[7px_0px] text-[0.95rem] font-medium w-[110px] text-center text-black"
              to="/cards"
            >
              Xem thêm
            </Link>
          </div>
          <div className="flex justify-center relative items-center">
            <div className="relative right-[-2.4em]">
              <Image
                Src={"/assets/bao/bao2.png"}
                Alt={""}
                ClassName={"sm:w-[210px] w-[170px] max-w-none"}
              />
            </div>
            <div className="relative left-[-2.4em]">
              <Image
                Src={"/assets/thiepmau/thiepsn.webp"}
                Alt={""}
                ClassName={"sm:w-[230px] w-[190px] max-w-none"}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#ffece9] w-full max-w-[500px] p-[30px] rounded-b-lg">
          <div className="mb-[30px]">
            <h2 className="mb-[12px] uppercase font-medium text-[1.5rem] text-black">
              Thiệp Tết
            </h2>

            <Link
              className="border border-black p-[7px_0px] text-[0.95rem] font-medium w-[110px] text-center text-black"
              to="/cards"
            >
              Xem thêm
            </Link>
          </div>
          <div className="flex justify-center relative items-center">
            <div className="relative right-[-2.4em]">
              <Image
                Src={"/assets/bao/bao1.png"}
                Alt={""}
                ClassName={"sm:w-[210px] w-[170px] max-w-none"}
              />
            </div>
            <div className="relative left-[-2.4em]">
              <Image
                Src={"/assets/thiepmau/thieptet.webp"}
                Alt={""}
                ClassName={"sm:w-[230px] w-[190px] max-w-none"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCollection;
