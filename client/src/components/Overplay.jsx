import React from "react";

function Overplay({ closeMenu, IndexForZ }) {
  const handleOverlayClick = () => {
    if (closeMenu) closeMenu();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black/50 opacity-100 pointer-events-auto transition ease-in-out duration-500"
      style={{ zIndex: IndexForZ }}
      onClick={handleOverlayClick}
    ></div>
  );
}

export default Overplay;
