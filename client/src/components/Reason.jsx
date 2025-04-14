import React from "react";
import Image from "./Image";

function Reason() {
  return (
    <section className="my-[60px] sm:my-[65px] px-[15px] bg-white">
      <h2 className="text-center mb-[50px] capitalize font-semibold sm:text-[2rem] text-[1.8rem] text-black">
        Lợi ích
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] mx-auto w-full max-w-[720px]">
        <div className="w-full max-w-full md:max-w-[360px] p-[25px] bg-white border border-gray-200">
          <div className="mb-[30px]">
            <Image
              Src={"/assets/other/globe.png"}
              Alt={""}
              ClassName={"w-[45px]"}
            />
          </div>
          <div>
            <h2 className="text-[1.2rem] mb-[15px] font-semibold text-black">
              Thân thiện với môi trường
            </h2>
            <p className="text-[0.95rem] leading-[1.5rem] text-black">
              Sử dụng thiệp điện tử giúp giảm lượng giấy sử dụng, góp phần bảo
              vệ môi trường.
            </p>
          </div>
        </div>

        <div className="w-full max-w-full md:max-w-[360px] p-[25px] bg-white border border-gray-200">
          <div className="mb-[30px]">
            <Image
              Src={"/assets/other/piggy-bank.png"}
              Alt={""}
              ClassName={"w-[45px]"}
            />
          </div>
          <div>
            <h2 className="text-[1.2rem] mb-[15px] font-semibold text-black">
              Tiết kiệm chi phí
            </h2>
            <p className="text-[0.95rem] leading-[1.5rem] text-black">
              Thiệp điện tử không tốn tiền in ấn, vận chuyển hay mua sắm giấy.
            </p>
          </div>
        </div>

        <div className="w-full max-w-full md:max-w-[360px] p-[25px] bg-white border border-gray-200">
          <div className="mb-[30px]">
            <Image
              Src={"/assets/other/save-time.png"}
              Alt={""}
              ClassName={"w-[45px]"}
            />
          </div>
          <div>
            <h2 className="text-[1.2rem] mb-[15px] font-semibold text-black">
              Tiết kiệm thời gian
            </h2>
            <p className="text-[0.95rem] leading-[1.5rem] text-black">
              Thiệp điện tử có thể được gửi đi chỉ trong vài giây qua email,
              mạng xã hội.
            </p>
          </div>
        </div>

        <div className="w-full max-w-full md:max-w-[360px] p-[25px] bg-white border border-gray-200">
          <div className="mb-[30px]">
            <Image
              Src={"/assets/other/setting.png"}
              Alt={""}
              ClassName={"w-[45px]"}
            />
          </div>
          <div>
            <h2 className="text-[1.2rem] mb-[15px] font-semibold text-black">
              Dễ dàng tùy chỉnh
            </h2>
            <p className="text-[0.95rem] leading-[1.5rem] text-black">
              Thiệp điện tử có thể dễ dàng tùy chỉnh màu sắc, hình ảnh, và phong
              cách khác nhau theo ý muốn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reason;
