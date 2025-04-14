import React, { useState, useEffect } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "./Image";
function Send() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState({});
  const [data, setData] = useState({
    _idsavecard: "",
    _idcard: "",
    namecard: "",
    content: "",
    subcategoryId: "",
    image: "",
    image1: "",
    fontFamily: "",
    color: "",
    fontStyle: "",
    fontWeight: "",
  });

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        setIsFlipped(true);
      }, 1600);
      setTimeout(() => {
        setShowButtons(true);
      }, 3200);
    } else {
      setShowButtons(false);
    }
  }, [isOpened]);

  const openUp = () => {
    setIsOpened(true);
  };
  const resetAnimation = () => {
    setIsOpened(false);
    setIsFlipped(false);
  };

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cardsave/${id}`
        );
        if (response.data.success) {
          setCard(response.data.data);
          setData({
            _idsavecard: response.data.data._id,
            namecard: response.data.data.idcard.namecard,
            content: response.data.data.contentedit,
            subcategoryId: response.data.data.idcard.subcategories,
            image: response.data.data.idcard.image,
            image1: response.data.data.idcard.image1,
            _idcard: response.data.data.idcard._id,
            fontFamily: response.data.data.fontfamily,
            color: response.data.data.color,
            fontWeight: response.data.data.fontweight,
            fontStyle: response.data.data.fontstyle,
          });
        }
      } catch (error) {
        toast.error("Không thấy thiệp chia sẻ!");
        navigate("/");
      }
    };

    fetchCard();
  }, [id]);

  return (
    <section
      className="p-[20px_15px] relative h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/background/bg-design3.webp')` }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-transparent"
        id="envelope"
      >
        <div
          className={`absolute top-0 left-0 block ${
            isOpened
              ? "opacity-0 transition-opacity duration-1000 delay-1000"
              : ""
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
            <polygon
              points="0,100 300,100 300,300 0,300"
              style={{ fill: "#FA8B7E", stroke: "none", strokeWidth: 0 }}
            />
          </svg>
        </div>
        <div
          className={`block absolute top-0 left-0 z-10 ${
            isOpened
              ? "opacity-0 transition-opacity duration-1000 delay-1000"
              : ""
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
            <polygon
              points="0,100 150,200 300,100 300,300 0,300"
              style={{ fill: "#FFB094", stroke: "#FFB094", strokeWidth: 3 }}
            />
          </svg>
        </div>
        <div
          className={`block absolute top-0 left-0 z-11 ${
            isOpened
              ? "opacity-0 transition-opacity duration-1000 delay-1000"
              : ""
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
            <polygon
              points={
                isOpened ? "0,100 150,0 300,100" : "0,100 150,200 300,100"
              }
              style={{ fill: "#FA8B7E", stroke: "#FA8B7E", strokeWidth: 2 }}
            />
          </svg>
        </div>

        <button
          onClick={openUp}
          className={`
           bg-yellow-400 flex items-center justify-center z-[15] w-[25px] h-[25px] rounded-full border-none bg-gold font-bold text-center cursor-pointer absolute top-[calc(207px-25px)] left-[calc(163px-25px)]
            ${
              isOpened
                ? "opacity-0 transition-opacity duration-1000 delay-1000"
                : ""
            }
          `}
        ></button>
      </div>

      {isOpened && (
        <div className="h-full w-full flex justify-center items-center">
          <div className={`flip-card ${isFlipped ? "show" : ""}`}>
            <div className={`flip-card-inner ${isFlipped ? "flip" : ""}`}>
              <div
                id="flip-card-front"
                className="absolute flex flex-col justify-center w-full h-fit backface-hidden drop-shadow-md shadow-md"
              >
                <Image
                  Src={
                    data.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                          data.image
                        }`
                      : ""
                  }
                  Alt={""}
                  ClassName={"w-full h-full block"}
                />
              </div>
              <div
                id="flip-card-back"
                className="absolute flex flex-col justify-center w-full h-fit backface-hidden drop-shadow-md shadow-md"
              >
                <Image
                  Src={
                    data.image1
                      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                          data.image1
                        }`
                      : "/assets/thiepmau/white.png"
                  }
                  Alt={""}
                  ClassName={"w-full h-full block"}
                />
                <div
                  className="absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/10 text-center text-[0.95rem] sm:text-[1rem] leading-6"
                  style={{
                    color: data.color ? `${data.color}` : "black",
                    fontFamily: data.fontFamily
                      ? `${data.fontFamily}`
                      : "Arial",
                    fontStyle: `${data.fontStyle}`,
                    fontWeight: `${data.fontWeight}`,
                  }}
                >
                  {data.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showButtons && (
        <div className="absolute top-[30px] right-[30px] flex flex-col gap-[15px] justify-center items-center">
          <button
            type="button"
            title="Trở về"
            className="w-[38px] h-[38px] flex justify-center items-center rounded-full border-[1.5px] border-black bg-white"
          >
            <Link
              to="/mycard"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TiArrowBack size={24} title="Trở về" />
            </Link>
          </button>
          <button
            type="button"
            className="w-[38px] h-[38px] flex justify-center items-center rounded-full border-[1.5px] border-black bg-white"
            onClick={resetAnimation}
            title="Phát lại"
          >
            <IoPlayOutline size={22} title="Phát lại" />
          </button>
        </div>
      )}

      <div className="absolute top-[30px] left-[30px]">
        <Link to="/">
          <Image
            Src={"/assets/other/logo.png"}
            Alt={"logo"}
            ClassName={"w-[80px]"}
          />
        </Link>
      </div>
    </section>
  );
}

export default Send;
