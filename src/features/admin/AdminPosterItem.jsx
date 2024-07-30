import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import the icons from react-icons
import Button from "../../ui/Button";

function AdminPosterItem({ posters, onEdit, onDelete }) {
  const [expandedPoster, setExpandedPoster] = useState(null);
  const [expandedCast, setExpandedCast] = useState(null);

  const handleTitleClick = (posterId) => {
    setExpandedPoster(expandedPoster === posterId ? null : posterId);
  };

  const handleCastClick = (posterId) => {
    setExpandedCast(expandedCast === posterId ? null : posterId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Film</th>
            <th className="border border-gray-300 px-4 py-2">Yıl</th>
            <th className="border border-gray-300 px-4 py-2">Yönetmen</th>
            <th className="border border-gray-300 px-4 py-2">Oyuncular</th>
            <th className="border border-gray-300 px-4 py-2">Poster</th>
            <th className="border border-gray-300 px-4 py-2">Düzenle/Sil</th>
          </tr>
        </thead>
        <tbody>
          {posters.map((poster) => (
            <tr key={poster.id} className="border-t border-gray-200">
              <td className="border-r border-gray-200 px-4 py-2">
                <div
                  className="cursor-pointer"
                  onClick={() => handleTitleClick(poster.id)}
                >
                  {expandedPoster === poster.id
                    ? poster.title
                    : `${poster.title.substring(0, 30)}${poster.title.length > 30 ? "..." : ""}`}
                </div>
              </td>
              <td className="border-r border-gray-200 px-4 py-2">
                {poster.time}
              </td>
              <td className="border-r border-gray-200 px-4 py-2">
                {poster.director}
              </td>
              <td className="border-r border-gray-200 px-4 py-2">
                <div
                  className="cursor-pointer"
                  onClick={() => handleCastClick(poster.id)}
                >
                  {expandedCast === poster?.id
                    ? poster?.cast
                    : `${poster?.cast?.substring(0, 30)}${poster?.cast?.length > 30 ? "..." : ""}`}
                </div>
              </td>
              <td className="border-r border-gray-200 px-4 py-2">
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="h-16 w-auto"
                />
              </td>
              <td className="mt-4 flex items-center justify-center space-x-4 px-4 py-2">
                <Button
                  handleOnClick={() => onEdit(poster)}
                  className="flex items-center p-2"
                >
                  <FaEdit className="text-2xl" />
                </Button>
                <Button
                  handleOnClick={() => onDelete(poster.id)}
                  className="flex items-center p-2"
                >
                  <FaTrash className="text-2xl" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPosterItem;
