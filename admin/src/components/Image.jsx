import React from "react";

function Image({ Src, Alt, ClassName }) {
  return <img src={Src} alt={Alt} className={ClassName} loading="lazy" />;
}

export default Image;
