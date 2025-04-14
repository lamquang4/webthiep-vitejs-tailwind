import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./page/Login";
import Register from "./page/Register";
import Card from "./page/Card";
import Account from "./page/Account";
import Design from "./page/Design";
import MyCard from "./page/MyCard";
import SendCard from "./page/SendCard";
import { useSelector } from "react-redux";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const hidePaths = ["/design", "/send"];
  const shouldHide = hidePaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (
      user.name &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [user.name, location.pathname, navigate]);

  return (
    <React.Fragment>
      {!shouldHide && <Header />}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cards" element={<Card />} />
        <Route path="/cards/:name" element={<Card />} />
        <Route path="/account" element={<Account />} />
        <Route path="/design/:id" element={<Design />} />
        <Route path="/mycard" element={<MyCard />} />
        <Route path="/send/:id" element={<SendCard />} />
      </Routes>
      {!shouldHide && <Footer />}
    </React.Fragment>
  );
}

export default Layout;
