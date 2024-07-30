import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getPosters } from "../services/apiPosters";
import Logo from "./Logo";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const {
    data: Posters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Posters"],
    queryFn: getPosters,
  });

  function onClickSearchBar() {
    setIsOpen(!isOpen);
  }

  function onHandleQuery(e) {
    setQuery(e.target.value.toLowerCase());
  }

  // Filter posters based on the query
  const filteredPosters = Posters?.filter((poster) => {
    const searchText = query.toLowerCase();
    return (
      poster.title.toLowerCase().includes(searchText) ||
      poster.cast.toLowerCase().includes(searchText) ||
      poster.director.toLowerCase().includes(searchText) ||
      poster.genre.toLowerCase().includes(searchText)
    );
  });

  return (
    <header className="w-full border border-black bg-black p-4 text-white">
      <div className="mb-4">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <NavLink to="/categories">Kategoriler</NavLink>
          <NavLink>Yeni Eklenenler</NavLink>
        </div>
        <div onClick={onClickSearchBar} className="flex items-center gap-1">
          <p>Ara</p>
          <FaSearch />
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 flex w-full items-center border-b border-b-white">
          <input
            onChange={(e) => onHandleQuery(e)}
            className="m-0 w-full bg-transparent p-0 text-white outline-none"
            type="text"
            placeholder="Bir film, aktör veya yönetmen ara"
          />
          <span onClick={onClickSearchBar}>
            <IoMdClose />
          </span>
        </div>
      )}

      {query && isOpen ? (
        <ul>
          {filteredPosters.map((poster, i) => (
            <li onClick={() => navigate(`posterler/${poster.id}`)} key={i}>
              {poster.title}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      <NavLink className="hidden sm:block" to="/login">
        Giriş
      </NavLink>
    </header>
  );
}

export default Header;
