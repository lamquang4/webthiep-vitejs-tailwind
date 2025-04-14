import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "./Image";
function HomeCarousel() {
  const [isSpecialDay, setIsSpecialDay] = useState("");

  const specialDays = [
    {
      day: 14,
      month: 2,
      name: "Valentine",
      title: "Thiệp Valentine",
      message: "Gửi gắm lời yêu thương qua những tấm thiệp dành tặng người yêu",
      image: "/assets/thiepmau/thiepvalentine.webp",
      background: "/assets/background/background3.webp",
    },
    {
      day: 8,
      month: 3,
      name: "NPNQT",
      title: "Thiệp 8/3",
      message:
        "  Gửi gắm những lời chúc qua những tấm thiệp dành tặng người phụ nữ",
      image: "/assets/thiepmau/thiep83.webp",
      background: "/assets/background/background3.webp",
    },
    {
      day: 31,
      month: 10,
      name: "Halloween",
      title: "Thiệp Halloween",
      message: " Chúc bạn có một Halloween thật vui nhộn và đầy kẹo ngọt!",
      image: "/assets/thiepmau/thiephalloween2.webp",
      background: "/assets/background/background2.webp",
    },
    {
      day: 20,
      month: 10,
      name: "NPNVN",
      title: "Thiệp 20/10",
      message:
        "Gửi gắm những lời chúc qua những tấm thiệp dành tặng người phụ nữ Việt Nam",
      image: "/assets/thiepmau/thiep2010.webp",
      background: "/assets/background/background3.webp",
    },
    {
      day: 20,
      month: 11,
      name: "NNGVN",
      title: "Thiệp 20/11",
      message: "Gửi gắm những lời chúc qua những tấm thiệp dành tặng thầy cô",
      image: "/assets/thiepmau/thiep2011.webp",
      background: "/assets/background/background3.webp",
    },
    {
      day: 25,
      month: 12,
      name: "Christmas",
      title: "Thiệp Giáng sinh",
      message:
        "Chúc bạn và gia đình một mùa Giáng Sinh an lành, tràn đầy yêu thương và hạnh phúc!",
      image: "/assets/thiepmau/thiepgs.webp",
      background: "/assets/background/background4.webp",
    },
  ];

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const todaySpecial = specialDays.find(
      (event) => event.day === day && event.month === month
    );

    if (todaySpecial) {
      setIsSpecialDay(todaySpecial);
    }
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        keyBoardControl={true}
        customTransition="transform 0.65s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        autoPlay={true}
        autoPlaySpeed={7500}
        infinite={true}
      >
        {isSpecialDay !== "" && (
          <div
            className="w-full lg:h-[650px] h-[900px] flex justify-center items-center bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${isSpecialDay.background})`,
            }}
          >
            <div className="lg:w-auto w-full flex mx-auto lg:justify-between justify-center items-center flex-wrap lg:flex-row flex-col lg:gap-[160px] gap-[50px] px-[15px] text-center lg:text-start">
              <div
                style={
                  isSpecialDay.name === "Halloween" ? { color: "#fff" } : {}
                }
              >
                <h2 className="text-black font-semibold text-[2.2rem] sm:text-[2.5rem] mb-[20px] tracking-[0] capitalize">
                  {isSpecialDay.title}
                </h2>
                <p className="text-black text-[1.1rem] sm:text-[1.2rem] mb-[25px] leading-[1.7rem] w-full max-w-[330px]">
                  {isSpecialDay.message}
                </p>

                <button
                  style={
                    isSpecialDay.name === "Halloween"
                      ? { color: "#fff", border: "1px solid #fff" }
                      : {}
                  }
                  className="relative inline-block w-[7em] py-[4px] leading-[2.5em] cursor-pointer overflow-hidden border-[1.5px] border-black transition-colors duration-500 z-[1] text-[0.95rem] font-medium text-black hover:text-white before:content-[''] before:absolute before:z-[-1] before:bg-black before:h-[150px] before:w-[200px] before:rounded-full before:top-[100%] before:left-[100%] before:transition-all before:duration-[600ms] hover:before:top-[-30px] hover:before:left-[-30px]"
                >
                  <div>
                    <Link
                      to="/cards"
                      className="relative !inline-block py-[2px] w-[7em] leading-[2.5em] cursor-pointer overflow-hidden border-[1.5px] border-black transition-colors duration-500 z-[1] text-[0.95rem] font-medium text-black hover:text-white before:content-[''] before:absolute before:z-[-1] before:bg-black before:h-[150px] before:w-[200px] before:rounded-full before:top-[100%] before:left-[100%] before:transition-all before:duration-[600ms] hover:before:top-[-30px] hover:before:left-[-30px] text-center"
                    >
                      Bắt đầu
                    </Link>
                  </div>
                </button>
              </div>
              <div className="drop-shadow-md shadow-md">
                <Image
                  Src={isSpecialDay.image}
                  Alt={""}
                  ClassName={"w-full sm:max-w-[330px] max-w-[280px]"}
                />
              </div>
            </div>
          </div>
        )}

        {isSpecialDay === "" && (
          <div
            className="w-full lg:h-[650px] h-[900px] flex justify-center items-center bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/background/background3.webp')`,
            }}
          >
            <div className="lg:w-auto w-full flex mx-auto lg:justify-between justify-center items-center flex-wrap lg:flex-row flex-col lg:gap-[160px] gap-[50px] px-[15px] text-center lg:text-start">
              <div>
                <h2 className="text-black font-semibold text-[2.2rem] sm:text-[2.5rem] mb-[20px] capitalize">
                  Thiệp Sinh Nhật
                </h2>
                <p className="text-black sm:text-[1.2rem] text-[1.1rem] mb-[25px] leading-[1.7rem] w-full max-w-[330px]">
                  Gửi gắm lời chúc qua những tấm thiệp dành tặng người thân
                  trong dịp sinh nhật
                </p>

                <div>
                  <Link
                    to="/cards"
                    className="relative !inline-block py-[2px] w-[7em] leading-[2.5em] cursor-pointer overflow-hidden border-[1.5px] border-black transition-colors duration-500 z-[1] text-[0.95rem] font-medium text-black hover:text-white before:content-[''] before:absolute before:z-[-1] before:bg-black before:h-[150px] before:w-[200px] before:rounded-full before:top-[100%] before:left-[100%] before:transition-all before:duration-[600ms] hover:before:top-[-30px] hover:before:left-[-30px] text-center"
                  >
                    Bắt đầu
                  </Link>
                </div>
              </div>
              <div className="drop-shadow-md shadow-md">
                <Image
                  Src={"/assets/thiepmau/thiepsn.webp"}
                  Alt={""}
                  ClassName={"w-full sm:max-w-[330px] max-w-[280px]"}
                />
              </div>
            </div>
          </div>
        )}

        {isSpecialDay === "" && (
          <div
            className="w-full lg:h-[650px] h-[900px] flex justify-center items-center bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/background/background3.webp')`,
            }}
          >
            <div className="lg:w-auto w-full flex mx-auto lg:justify-between justify-center items-center flex-wrap lg:flex-row flex-col lg:gap-[160px] gap-[50px] px-[15px] text-center lg:text-start">
              <div className="mx-auto">
                <h2 className="text-black font-semibold text-[2.2rem] sm:text-[2.5rem] mb-[20px] tracking-[0] capitalize">
                  Thiệp Tết
                </h2>
                <p className="text-black text-[1.1rem] sm:text-[1.2rem] mb-[25px] leading-[1.7rem] w-full max-w-[330px]">
                  Gửi gắm những lời chúc qua những tấm thiệp dành tặng người
                  thân
                </p>

                <div>
                  <Link
                    to="/cards"
                    className="relative !inline-block py-[2px] w-[7em] leading-[2.5em] cursor-pointer overflow-hidden border-[1.5px] border-black transition-colors duration-500 z-[1] text-[0.95rem] font-medium text-black hover:text-white before:content-[''] before:absolute before:z-[-1] before:bg-black before:h-[150px] before:w-[200px] before:rounded-full before:top-[100%] before:left-[100%] before:transition-all before:duration-[600ms] hover:before:top-[-30px] hover:before:left-[-30px] text-center"
                  >
                    Bắt đầu
                  </Link>
                </div>
              </div>
              <div className="drop-shadow-md shadow-md">
                <Image
                  Src={"/assets/thiepmau/thieptet.webp"}
                  Alt={""}
                  ClassName={"w-full sm:max-w-[330px] max-w-[280px]"}
                />
              </div>
            </div>
          </div>
        )}
      </Carousel>
    </section>
  );
}

export default HomeCarousel;
