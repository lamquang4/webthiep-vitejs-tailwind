import React from "react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
function Loading() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <ClipLoader color={"black"} loading={loading} size={55} />
    </div>
  );
}

export default Loading;
