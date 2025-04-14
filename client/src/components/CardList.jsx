import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "./Image";
function CardList() {
  const [cards, setCards] = useState([]);
  const [subcategoryMap, setSubCategoryMap] = useState({});
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/all-cards`
        );
        if (response.data.success) {
          const fetchedCards = response.data.data;
          setCards(fetchedCards);

          const subcategoryIds = [
            ...new Set(fetchedCards.map((sub) => sub.subcategories)),
          ];
          const fetchSubCategories = async () => {
            const subcategoryData = {};
            for (const id of subcategoryIds) {
              try {
                const subcategoryResponse = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/subcategory/${id}`
                );
                if (subcategoryResponse.data.success) {
                  subcategoryData[id] =
                    subcategoryResponse.data.data.namesubcate;
                }
              } catch (error) {
                console.error("Lỗi: ", error);
              }
            }
            setSubCategoryMap(subcategoryData);
          };
          fetchSubCategories();
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    };

    fetchCards();
  }, []);
  return (
    <section className="mt-[60px] sm:mt-[65px] px-[15px] bg-white">
      <h2 className="text-center mb-[50px] capitalize font-semibold sm:text-[2rem] text-[1.8rem] text-black">
        Bộ sưu tập
      </h2>
      <div className="grid lg:grid-cols-4 gap-x-[30px] gap-y-[40px] w-full max-w-[1300px] mx-auto grid-cols-2">
        {cards
          .filter((_, index) => [4, 5, 6, 7].includes(index))
          .map((card) => (
            <div className="text-center" key={card._id}>
              <div className="flex justify-center">
                <Link to={`/design/${card._id}`}>
                  {card.image && (
                    <Image
                      Src={`${import.meta.env.VITE_BACKEND_URL}/uploads/thiep/${
                        card.image
                      }`}
                      Alt={card.namecard}
                      ClassName={
                        "max-w-[245px] w-full drop-shadow-[3px_3px_4px_rgba(0,0,0,0.15)]"
                      }
                    />
                  )}
                </Link>
              </div>
              <Link
                to={`/design/${card._id}`}
                className="mt-[22px] font-medium text-[1rem]"
              >
                {card.namecard}
              </Link>
            </div>
          ))}
      </div>

      <Link
        className="bg-black text-[0.95rem] text-white w-[110px] p-[11px_0] text-center mx-auto mt-[40px] font-medium"
        to="/cards"
      >
        Xem tất cả
      </Link>
    </section>
  );
}

export default CardList;
