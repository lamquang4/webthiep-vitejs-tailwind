import React from "react";
import HomeCarousel from "../components/HomeCarousel";
import HomeCollection from "../components/HomeCollection";
import CardList from "../components/CardList";
import Reason from "../components/Reason";

function Home() {
  return (
    <React.Fragment>
      <HomeCarousel />
      <HomeCollection />
      <CardList />
      <Reason />
    </React.Fragment>
  );
}

export default Home;
