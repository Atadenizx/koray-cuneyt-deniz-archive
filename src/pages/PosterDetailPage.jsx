import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPosters } from "../services/apiPosters";
import { IoMdArrowBack } from "react-icons/io";

function PosterDetailPage() {
  const { posterId } = useParams();

  const navigate = useNavigate();

  const {
    data: Posters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Posters"],
    queryFn: getPosters,
  });

  const poster = Posters?.find((poster) => poster.id === Number(posterId));

  function capitalizeFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading poster</p>}
      {poster && (
        <div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl" onClick={() => navigate(-1)}>
              <IoMdArrowBack />
            </div>
            <div className="flex flex-wrap justify-end text-3xl font-bold">
              {capitalizeFirstLetter(poster.title)}
            </div>
          </div>
          <div className="my-4">
            <img src={poster.image} alt={poster.title} />
          </div>
          <div className="flex text-center">
            <div className="mr-4 flex flex-col">
              <h1 className="font-semibold">Yıl</h1>
              <h1>{poster.time}</h1>
            </div>
            <div className="mr-4 flex flex-col">
              <h1 className="font-semibold">Yönetmen</h1>
              <h1>{capitalizeFirstLetter(poster.director)}</h1>
            </div>
            <div className="mr-4 flex flex-col">
              <h1 className="font-semibold">Oyuncular</h1>
              <h1>
                {poster.cast.split(", ").map(capitalizeFirstLetter).join(", ")}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PosterDetailPage;
