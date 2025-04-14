import React from "react";
import Overplay from "./Overplay";
import Image from "./Image";
import { HiMiniXMark } from "react-icons/hi2";
function ImageViewer({ imgSrc, onClose }) {
  return (
    <div className="relative w-full h-full block">
      <button
        className="fixed top-[20px] right-[20px] z-[101] bg-white rounded-full flex justify-center items-center"
        onClick={onClose}
      >
        <HiMiniXMark size={34} />
      </button>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] w-full md:max-w-[360px] max-w-[300px]">
        <div className="flex justify-center items-center">
          <Image Src={imgSrc} Alt={""} ClassName={"w-full"} />
        </div>
      </div>

      <Overplay onClose={onClose} />
    </div>
  );
}

export default ImageViewer;
