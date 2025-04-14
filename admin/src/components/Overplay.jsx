import React from "react";

function Overplay({ onClose }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500 z-99"
      onClick={onClose}
    ></div>
  );
}

export default Overplay;
