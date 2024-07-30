import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Footer from "../ui/Footer";
import { useQuery } from "@tanstack/react-query";
import { getPosters } from "../services/apiPosters";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const {
    data: Posters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Posters"],
    queryFn: getPosters,
  });

  const carouselPosters = Posters?.slice(-5);

  return (
    <div className="h-screen w-full">
      <main className="h-fit w-full border border-black">
        <Carousel
          axis="vertical"
          dynamicHeight={true}
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          showArrows={false}
        >
          {carouselPosters?.map((poster) => (
            <img key={poster.id} src={poster.image} alt={poster.title} />
          ))}
        </Carousel>
      </main>
      <div
        onClick={() => navigate(`/posterler/fantastik`)}
        className="grid grid-cols-2 items-center bg-black p-4"
      >
        <h1 className="col-span-1 text-center text-2xl text-white active:text-gray-400">
          Tüm Fantastik Posterler
        </h1>
        <img src="/public/tarkan-viking-kanı.jpg" alt="tarkan poster" />
      </div>
      <div
        onClick={() => navigate(`/posterler/Aktörler/${"Cüneyt Arkın"}`)}
        className="grid grid-cols-2 items-center bg-white p-4"
      >
        <img src="/public/tarkan-viking-kanı.jpg" alt="tarkan poster" />
        <h1 className="col-span-1 text-center text-2xl text-black active:text-gray-400">
          Cüneyt Arkın Posterleri
        </h1>
      </div>
      <div
        onClick={() => navigate(`/posterler/Aktörler/${"Kemal Sunal"}`)}
        className="grid grid-cols-2 items-center bg-black p-4"
      >
        <h1 className="col-span-1 text-center text-2xl text-white active:text-gray-400">
          Kemal Sunal Posterleri
        </h1>
        <img src="/public/tarkan-viking-kanı.jpg" alt="tarkan poster" />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
