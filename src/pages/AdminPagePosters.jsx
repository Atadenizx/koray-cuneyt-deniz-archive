import { useQuery } from "@tanstack/react-query";
import { getPosters } from "../services/apiPosters";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";
import { sortOptionsArr } from "../data/data";
import Spinner from "../ui/Spinner";
import AdminPosterItem from "../features/admin/AdminPosterItem";
import Modal from "../ui/Modal";
import AddOrEditProductsForm from "../ui/AddOrEditProductsForm";
import useDeletePosters from "../features/admin/useDeletePosters";

function AdminPagePosters() {
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [posterToEdit, setPosterToEdit] = useState({});
  const [isSortedBy, setIsSortedBy] = useState("");

  const {
    data: AdminPosters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Admin_posters"],
    queryFn: getPosters,
  });

  if (error) {
    console.log(error.message);
  }

  const { deletePoster } = useDeletePosters();

  function onEdit(poster) {
    setPosterToEdit(poster);
    setEditMode((editMode) => !editMode);
    setOpenModal(!openModal);
  }
  function onDelete(id) {
    deletePoster(id);
    console.log(id);
  }

  function onSortBy(e) {
    console.log(e.target.value);
  }

  return (
    <div className="relative">
      <header className="flex items-center justify-center gap-4">
        <Select
          optionsArr={sortOptionsArr}
          defaultValue="alphabetical"
          onChange={(e) => onSortBy(e)}
          id="sort"
          caption="Sırala"
        />
        <Button>Filtrele</Button>
        <Input placeholder="Poster Ara" type="text"></Input>
        <Button handleOnClick={() => setOpenModal(!openModal)} type="primary">
          Yeni Poster Ekle
        </Button>
      </header>
      <ul>
        {isLoading ? (
          <Spinner />
        ) : (
          <AdminPosterItem
            onEdit={onEdit}
            onDelete={onDelete}
            posters={AdminPosters}
          />
        )}
      </ul>
      <div className="absolute right-28 top-20 z-20">
        {openModal && (
          <Modal
            editMode={editMode}
            setEditMode={setEditMode}
            setOpenModal={setOpenModal}
            openModal={openModal}
          >
            <AddOrEditProductsForm
              posterToEdit={posterToEdit}
              setEditMode={setEditMode}
              editMode={editMode}
              setOpenModal={setOpenModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default AdminPagePosters;
