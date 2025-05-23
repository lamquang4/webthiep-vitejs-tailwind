import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./page/Login";
import SideMenu from "./components/SideMenu";
import AdminQTV from "./page/AdminQTV";
import AdminCard from "./page/AdminCard";
import AdminND from "./page/AdminND";
import AdminDM from "./page/AdminDM";
import AdminSUBDM from "./page/AdminSUBDM";
import AdminAddCard from "./page/AdminAddCard";
import AdminAddDM from "./page/AdminAddDM";
import AdminAddSUBDM from "./page/AdminAddSUBDM";
import AdminAddND from "./page/AdminAddND";
import AdminAddQTV from "./page/AdminAddQTV";
import AdminEditCard from "./page/AdminEditCard";
import AdminEditDM from "./page/AdminEditDM";
import AdminEditSUBDM from "./page/AdminEditSUBDM";
import AdminEditND from "./page/AdminEditND";
import AdminEditQTV from "./page/AdminEditQTV";
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const hideHeaderPaths = ["/login"];
  const shouldHide = hideHeaderPaths.includes(location.pathname);
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      navigate({ location });
    }
  }, [userId]);
  return (
    <React.Fragment>
      {!shouldHide && <SideMenu />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AdminQTV />} />
        <Route path="/ad-card" element={<AdminCard />} />
        <Route path="/ad-qtv" element={<AdminQTV />} />
        <Route path="/ad-nd" element={<AdminND />} />
        <Route path="/ad-dm" element={<AdminDM />} />
        <Route path="/ad-subdm" element={<AdminSUBDM />} />

        <Route path="/ad-add-card" element={<AdminAddCard />} />
        <Route path="/ad-add-dm" element={<AdminAddDM />} />
        <Route path="/ad-add-subdm" element={<AdminAddSUBDM />} />
        <Route path="/ad-add-nd" element={<AdminAddND />} />
        <Route path="/ad-add-qtv" element={<AdminAddQTV />} />

        <Route path="/ad-edit-card/:id" element={<AdminEditCard />} />
        <Route path="/ad-edit-dm/:id" element={<AdminEditDM />} />
        <Route path="/ad-edit-subdm/:id" element={<AdminEditSUBDM />} />
        <Route path="/ad-edit-nd/:id" element={<AdminEditND />} />
        <Route path="/ad-edit-qtv/:id" element={<AdminEditQTV />} />
      </Routes>
    </React.Fragment>
  );
}

export default Layout;
