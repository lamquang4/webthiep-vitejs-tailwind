import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useParams, Link, useNavigate } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { GrRotateLeft } from "react-icons/gr";
import { BsTypeBold } from "react-icons/bs";
import { BsTypeItalic } from "react-icons/bs";
import Image from "./Image";
function DesignCard() {
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const [card, setCard] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState({
    _idsavecard: "",
    _idcard: "",
    namecard: "",
    content: "",
    subcategoryId: "",
    image: "",
    image1: "",
  });
  const [isOverLimit, setIsOverLimit] = useState(false);
  const [content, setContent] = useState("");
  const [font, setFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const maxChars = 200;

  const toggleBold = () => {
    setFontWeight((prevWeight) => (prevWeight === "bold" ? "normal" : "bold"));
  };

  const toggleItalic = () => {
    setFontStyle((prevStyle) => (prevStyle === "italic" ? "normal" : "italic"));
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (newContent.length <= maxChars) {
      setIsOverLimit(false);
    } else {
      setIsOverLimit(true);
    }
  };

  const handleContentEditableChange = (e) => {
    const textOnly = e.target.value
      .replace(/<\/div>/g, "\n")
      .replace(/<br>/g, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "");

    setContent(textOnly);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const handleColorChange = (color) => {
    setTextColor(color.hex);
  };

  // lấy thông tin thiệp
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/card/${id}`
        );
        if (response.data.success) {
          const fetchedData = response.data.data;

          if (fetchedData.idcard) {
            // Nếu là savecard
            setCard(fetchedData.idcard);
            setData({
              _idsavecard: fetchedData._id,
              namecard: fetchedData.idcard.namecard,
              content: fetchedData.contentedit,
              subcategoryId: fetchedData.idcard.subcategories,
              image: fetchedData.idcard.image,
              image1: fetchedData.idcard.image1,
              _idcard: fetchedData.idcard._id,
            });
            if (fetchedData.contentedit) {
              setContent(fetchedData.contentedit);
              setFont(fetchedData.fontfamily || "Arial");
              setTextColor(fetchedData.color || "#000000");
              setFontWeight(fetchedData.fontweight);
              setFontStyle(fetchedData.fontstyle);
            } else {
              setContent(fetchedData.content);
            }
          } else {
            // Nếu là card gốc
            setCard(fetchedData);
            setData({
              _idcard: fetchedData._id,
              namecard: fetchedData.namecard,
              content: fetchedData.content,
              subcategoryId: fetchedData.subcategories,
              image: fetchedData.image,
              image1: fetchedData.image1,
            });
            setContent(fetchedData.content);
          }
        }
      } catch (error) {
        toast.error("Thiệp không tồn tại!");
        navigate("/");
      }
    };

    fetchCard();
  }, [id]);

  // lật thiệp lại
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // thêm và cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Bạn cần đăng nhập để lưu thiết kế!");
      navigate("/login");
      return;
    }

    if (content.length > maxChars) {
      toast.error("Nội dung phải ít nhất 200 ký tự");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/savecard`,
        {
          contentedit: content,
          fontfamily: font,
          fontweight: fontWeight,
          fontstyle: fontStyle,
          color: textColor,
          idcard: data._idcard,
          iduser: userId,
        }
      );

      if (response.data.success) {
        toast.success("Lưu thành công!");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (content.length > maxChars) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  }, [handleContentEditableChange]);
  return (
    <>
      <section className="">
        <div className="w-full bg-white sticky top-0 border-b border-gray-200 z-[15]">
          <div className="flex justify-between items-center py-[20px] px-[15px] md:px-[20px] lg:px-[40px]">
            <Link to={"/"}>
              <Image
                Src={"/assets/other/logo.png"}
                Alt={"logo"}
                ClassName={"w-[80px]"}
              />
            </Link>

            <div className="flex gap-[25px]">
              <button
                className="w-[70px] py-1.5 bg-[rgb(0,100,250)] text-white text-center text-[0.9rem]"
                type="submit"
                form="form-design"
              >
                Lưu
              </button>

              <Link
                className="w-[70px] py-1.5 bg-[#ee5435] text-white text-center text-[0.9rem]"
                to={"/"}
              >
                Trở về
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url('/assets/background/bg-design3.webp')`,
          }}
          className="flex items-center p-[60px_12px] bg-cover bg-center"
        >
          <div className="flex justify-center flex-wrap items-center w-full gap-[70px]">
            <div
              className={`relative inline-block [transform-style:preserve-3d] transition-transform duration-500 ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              <div
                className={`relative w-full h-auto drop-shadow-md shadow-md overflow-hidden ${
                  isFlipped ? "hidden" : "flex"
                }`}
              >
                {data.image && (
                  <Image
                    Src={`${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                      data.image
                    }`}
                    Alt={""}
                    ClassName={"w-full max-w-[400px] object-cover"}
                  />
                )}
              </div>

              <div
                className={`relative w-full h-auto drop-shadow-md shadow-md overflow-hidden bg-white [transform:rotateY(180deg)] ${
                  isFlipped ? "flex" : "hidden"
                }`}
              >
                {data.image1 ? (
                  <Image
                    Src={`${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                      data.image1
                    }`}
                    Alt={""}
                    ClassName={"w-full max-w-[400px] object-cover"}
                  />
                ) : (
                  <Image
                    Src={"/assets/thiepmau/white.png"}
                    Alt={""}
                    ClassName={"w-full max-w-[400px] object-cover"}
                  />
                )}

                <div className="absolute top-[46%] left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-wrap gap-2 w-[90%]">
                  <ContentEditable
                    className="text-[0.95rem] sm:text-[1rem]"
                    html={content}
                    onChange={handleContentEditableChange}
                    style={{
                      fontFamily: font,
                      fontWeight: fontWeight,
                      fontStyle: fontStyle,
                      color: textColor,
                      border: `2px dashed ${textColor || "#8AB6E6"}`,
                      textAlign: "center",
                      whiteSpace: "pre-wrap",
                      width: "100%",
                      outline: "none",
                      lineHeight: "1.5rem",
                    }}
                  />
                </div>
              </div>

              <button
                className="absolute top-0 right-0 sm:left-[-50px] w-[40px] h-[40px] bg-white rounded-full shadow-md flex justify-center items-center"
                onClick={handleFlip}
                title="Lật thiệp"
              >
                <GrRotateLeft size={20} />
              </button>
            </div>

            <div className="bg-white border border-slate-300 max-w-[450px] h-full  p-6 w-full">
              <form
                action=""
                id="form-design"
                className="flex flex-col items-start gap-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col flex-wrap gap-[5px] w-full">
                  <label htmlFor="content" className="text-[0.9rem]">
                    Sửa nội dung
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    className={`max-w-[400px] h-[115px] resize-none leading-[22px] text-[0.9rem] p-[6px] outline-none ${
                      isOverLimit
                        ? "border border-red-500"
                        : "border border-slate-300"
                    }`}
                    required
                  />
                  <small
                    className={isOverLimit ? "text-red-500 font-medium" : ""}
                  >
                    {content.length}/{maxChars} ký tự
                  </small>
                </div>

                <div
                  className="flex flex-col flex-wrap gap-[5px] w-full"
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "unset",
                  }}
                >
                  <button
                    type="button"
                    className={` text-[0.9rem] flex justify-center items-center p-1 hover:bg-[#dddddd] ${
                      fontWeight === "bold"
                        ? "bg-[rgb(238,238,238)] border border-black"
                        : "border border-slate-300 bg-white"
                    }`}
                    onClick={toggleBold}
                    style={{ fontWeight: fontWeight }}
                  >
                    <BsTypeBold size={20} color="black" />
                  </button>

                  <button
                    type="button"
                    className={` text-[0.9rem] flex justify-center items-center p-1 hover:bg-[#dddddd] ${
                      fontStyle === "italic"
                        ? "bg-[rgb(238,238,238)] border border-black"
                        : "border border-slate-300 bg-white"
                    }`}
                    onClick={toggleItalic}
                    style={{ fontStyle: fontStyle }}
                  >
                    <BsTypeItalic size={20} color="black" />
                  </button>
                </div>

                <div className="flex flex-col flex-wrap gap-[5px] w-full">
                  <label htmlFor="font">Kiểu chữ</label>
                  <select
                    id="font"
                    name="font"
                    className="w-[60%] border border-slate-300 p-2 outline-none text-[0.9rem] text-black"
                    value={font}
                    onChange={handleFontChange}
                  >
                    <option value="Arial" style={{ fontFamily: "Arial" }}>
                      Arial
                    </option>
                    <option
                      value="Times New Roman"
                      style={{ fontFamily: "Times New Roman" }}
                    >
                      Times New Roman
                    </option>
                    <option value="Calibri" style={{ fontFamily: "Calibri" }}>
                      Calibri
                    </option>
                    <option value="Verdana" style={{ fontFamily: "Verdana" }}>
                      Verdana
                    </option>
                    <option
                      value="Quicksand"
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Quicksand
                    </option>
                    <option value="Georgia" style={{ fontFamily: "Georgia" }}>
                      Georgia
                    </option>
                    <option value="Roboto" style={{ fontFamily: "Roboto" }}>
                      Roboto
                    </option>
                    <option value="Oswald" style={{ fontFamily: "Oswald" }}>
                      Oswald
                    </option>
                    <option value="Lato" style={{ fontFamily: "Lato" }}>
                      Lato
                    </option>
                    <option
                      value="Open Sans"
                      style={{ fontFamily: "Open Sans" }}
                    >
                      Open Sans
                    </option>
                    <option
                      value="Montserrat"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Montserrat
                    </option>
                    <option value="Pacifico" style={{ fontFamily: "Pacifico" }}>
                      Pacifico
                    </option>
                    <option
                      value="Dancing Script"
                      style={{ fontFamily: "Dancing Script" }}
                    >
                      Dancing Script
                    </option>
                  </select>
                </div>
                <div className="flex flex-col flex-wrap gap-[5px] w-full">
                  <label htmlFor="textColor">Màu chữ</label>
                  <SketchPicker
                    color={textColor}
                    onChangeComplete={handleColorChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DesignCard;
