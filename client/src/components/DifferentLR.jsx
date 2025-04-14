import React from "react";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { setToken } from "../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
function DifferentLR({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        const { name, email } = userInfo.data;

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/google-login`,
          { email, name },
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setToken(res.data.token));
          localStorage.setItem("token_user", res.data.token);
          navigate("/");
        }
      } catch (error) {
        toast.error("Email này đã được dùng để tạo tài khoản!");
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });
  return (
    <React.Fragment>
      <div className="flex items-center m-[30px_0]">
        <div className="flex-grow bg-[#e5e5e5] border-t border-t-[#e5e5e5] h-[0.5px]"></div>
        <div className="px-[0.6rem] text-[0.9rem] text-black">Hoặc {title}</div>
        <div className="flex-grow bg-[#e5e5e5] border-t border-t-[#e5e5e5] h-[0.5px]"></div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={login}
          className="px-[12px] py-[7px] border border-[rgba(0,0,0,0.26)]"
        >
          <div className="text-[0.9rem] flex items-center gap-[10px] font-medium text-black">
            <Image
              Src={"/assets/other/google.png"}
              Alt={""}
              ClassName={"w-[25px]"}
            />
            <div>Google</div>
          </div>
        </button>
      </div>
    </React.Fragment>
  );
}

export default DifferentLR;
