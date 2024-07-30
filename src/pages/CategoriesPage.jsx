import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const actorsNameArr = [
  "Sadri Alışık",
  "Türkan Şoray",
  "Ayhan Işık",
  "Kemal Sunal",
  "Şener Şen",
  "İlyas Salman",
  "Tarık Akan",
  "Zeki Alasya",
  "Metin Akpınar",
  "Müjde Ar",
  "Hülya Avşar",
  "Hülya Koçyiğit",
  "Cüneyt Arkın",
  "Ferdi Tayfur",
  "Orhan Gencebay",
];

function CategoriesPage() {
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();

  function onHandleClick(category) {
    setOpenCategory(openCategory === category ? null : category);
  }

  function handleNavigate(categoryType, categoryValue) {
    navigate(`/posterler/${categoryType}/${categoryValue}`);
  }

  function onHandleClose() {
    navigate(-1);
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-evenly p-4 text-lg font-bold">
      <div>
        <div
          className="border-b border-b-black"
          onClick={() => onHandleClick("year")}
        >
          Yıl
        </div>
        {openCategory === "year" && (
          <ul className="ml-4 flex flex-col gap-2">
            <li onClick={() => handleNavigate("Yıllar", "1950-1959")}>
              <Link to="#">1950-1959</Link>
            </li>
            <li onClick={() => handleNavigate("Yıllar", "1960-1969")}>
              <Link to="#">1960-1969</Link>
            </li>
            <li onClick={() => handleNavigate("Yıllar", "1970-1979")}>
              <Link to="#">1970-1979</Link>
            </li>
            <li onClick={() => handleNavigate("Yıllar", "1980-1989")}>
              <Link to="#">1980-1989</Link>
            </li>
            <li onClick={() => handleNavigate("Yıllar", "1990-Gunumuz")}>
              <Link to="#">1990-Günümüz</Link>
            </li>
          </ul>
        )}
      </div>
      <div>
        <div
          className="border-b border-b-black"
          onClick={() => onHandleClick("actor")}
        >
          Aktör
        </div>
        {openCategory === "actor" && (
          <ul className="ml-4 flex flex-col gap-2 border-b border-b-black">
            {actorsNameArr
              .sort((a, b) => a.localeCompare(b))
              .map((actor) => (
                <li
                  key={actor}
                  onClick={() => handleNavigate("Aktörler", actor)}
                >
                  <Link to="#">{actor}</Link>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div
        className="border-b border-b-black"
        onClick={() => handleNavigate("Yönetmenler", "all")}
      >
        Yönetmen
      </div>
      <div className="flex justify-between border-b border-b-black">
        <div onClick={() => handleNavigate("Fantastik", "evet")}>Fantastik</div>
        <div className="" onClick={onHandleClose}>
          x
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
