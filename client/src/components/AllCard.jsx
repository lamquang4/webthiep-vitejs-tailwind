import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Image from "./Image";
function AllCard() {
  const [cards, setCards] = useState([]);
  const [subcategoryMap, setSubCategoryMap] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage, navigate, location.search]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const path = location.pathname.split("/")[2];
        let url = `${import.meta.env.VITE_BACKEND_URL}/api/all-cards`;

        if (path) {
          url = `${
            import.meta.env.VITE_BACKEND_URL
          }/api/cards-by-subcategory/${path}`;
        }

        const response = await axios.get(url);
        if (response.data.success) {
          const fetchedCards = response.data.data;
          setCards(fetchedCards);

          const filtered = fetchedCards.filter((card) =>
            card.namecard
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase())
          );
          setFilteredCards(filtered);

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
      } finally {
        setIsLoading(false);
      }
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchCards();
  }, [searchQuery, location.pathname]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  return (
    <section className="my-[60px] sm:my-[65px] px-[15px] bg-white">
      <h2 className="text-center mb-[50px] capitalize font-semibold sm:text-[2rem] text-[1.8rem] text-black">
        {searchQuery ? `${searchQuery}` : "Tất Cả Thiệp"}
      </h2>
      <div
        className="grid lg:grid-cols-4 gap-x-[30px] gap-y-[40px] w-full max-w-[1300px] mx-auto grid-cols-2"
        style={{
          display: currentCards.length <= 0 ? "flex" : "grid",
          gridTemplateColumns: isLoading ? "repeat(1, 1fr)" : "",
          justifyContent: isLoading ? "center" : "",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : currentCards.length > 0 ? (
          currentCards.map((card) => (
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
          ))
        ) : (
          <div className="h-[50vh] w-full flex flex-col justify-center items-center">
            <Image
              Src={"/assets/other/notfound1.png"}
              Alt={""}
              ClassName={"w-[200px]"}
            />
          </div>
        )}
      </div>

      {filteredCards.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}

export default AllCard;
