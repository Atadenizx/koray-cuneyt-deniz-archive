/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { getPosters } from "../services/apiPosters";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

function PosterLayoutPage() {
  const { categoryType, categoryValue } = useParams();
  const navigate = useNavigate();
  let filteredPosters;

  console.log(categoryValue);

  const {
    data: Posters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Posters"],
    queryFn: getPosters,
  });

  function onHandlePosterClick(posterId) {
    console.log("poster id:", posterId);
    navigate(`${posterId}`);
  }
  function onHandleFilteredPosterClick(posterId) {
    console.log("poster id:", posterId);
    navigate(`/posterler/${posterId}`);
  }

  if (categoryType || categoryValue) {
    // Filtering by years
    if (categoryType === "Yıllar" && categoryValue.includes("-")) {
      const [startYear, endYear] = categoryValue.split("-");
      filteredPosters = Posters?.filter(
        (poster) => poster.time >= startYear && poster.time <= endYear,
      );
      console.log("filtered posters", filteredPosters);
    }

    // Filtering by Actors
    if (categoryType === "Aktörler") {
      const organizedText = categoryValue.split(" ").join("").toLowerCase();
      console.log(organizedText);
      filteredPosters = Posters?.filter((poster) =>
        poster.cast.split(" ").join("").toLowerCase().includes(organizedText),
      );
      console.log(`${categoryValue} içeren filmler:`, filteredPosters);
    }

    // Filtering by Directors
    if (categoryType === "Yönetmenler") {
      const organizedText = categoryValue.split(" ").join("").toLowerCase();
      console.log(organizedText);
      filteredPosters = Posters?.filter((poster) =>
        poster.director
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(organizedText),
      );
      console.log(`${categoryValue} içeren filmler:`, filteredPosters);
    }

    // Filtering by Genre
    if (categoryType === "Fantastik") {
      filteredPosters = Posters?.filter((poster) => poster.genre === true);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <ul>
        {filteredPosters
          ? filteredPosters?.map((poster) => (
              <PosterLayoutPageItem
                poster={poster}
                key={poster.id}
                onHandleFilteredPosterClick={onHandleFilteredPosterClick}
              />
            ))
          : Posters?.map((poster) => (
              <PosterLayoutPageItem
                poster={poster}
                key={poster.id}
                onHandlePosterClick={onHandlePosterClick}
              />
            ))}
      </ul>
    </div>
  );
}

export default PosterLayoutPage;

function PosterLayoutPageItem({
  poster,
  onHandleFilteredPosterClick,
  onHandlePosterClick,
}) {
  const { id: posterId } = poster;
  return (
    <li
      className="border-b border-b-black p-4"
      onClick={
        onHandlePosterClick
          ? () => onHandlePosterClick(posterId)
          : () => onHandleFilteredPosterClick(posterId)
      }
    >
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col justify-evenly">
          <h1 className="flex-wrap text-lg font-bold">{poster.title}</h1>
          <h1>{poster.time}</h1>
          <h1 className="">{poster.director}</h1>
          <p className="flex-wrap">{poster.cast}</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <img className="h-40" src={poster.image} alt={poster.title} />
        </div>
      </div>
    </li>
  );
}
