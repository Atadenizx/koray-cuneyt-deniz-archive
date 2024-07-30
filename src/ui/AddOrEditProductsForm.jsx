import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { genreOptionsArr } from "../data/data";
import useEditPosters from "../features/admin/useEditPosters";
import useAddPosters from "../features/admin/useAddPosters";

function AddOrEditProductsForm({
  setEditMode,
  editMode,
  posterToEdit = "",
  setOpenModal,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const { id: editId, ...editValues } = posterToEdit;

  const { register, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: editMode ? editValues : {},
  });

  const { addPoster } = useAddPosters();
  const { editPoster } = useEditPosters();

  useEffect(() => {
    if (editMode && posterToEdit.image) {
      setCurrentImage(posterToEdit.image);
      setValue("image", null); // Reset the image file input
    }
  }, [editMode, posterToEdit, setValue]);

  function onHandleSubmit(data) {
    console.log(data);
    const imageFiles = getValues("image");
    const imageFile =
      imageFiles && imageFiles.length > 0 ? imageFiles[0] : currentImage;

    if (editMode && !imageFile) {
      toast.error("Image is required");
      return;
    }

    const posterData = {
      ...data,
      image: imageFile instanceof File ? imageFile : currentImage,
    };

    if (editMode) {
      setIsSubmitting(true);
      editPoster({
        poster: posterData,
        id: editId,
      });
      setEditMode(false);
      setOpenModal(false);
      console.log("editing", data);
      setIsSubmitting(false);
      reset();
      return;
    }

    setIsSubmitting(true);
    addPoster({ poster: posterData });
    setIsSubmitting(false);
    reset();
    setOpenModal(false);
  }

  function onHandleError(err) {
    toast.error("error");
    console.log("add/edit product form error", err);
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-xl font-semibold">
        {editMode ? "Seçilen Posteri Düzenle" : "Yeni Poster Ekle"}
      </h1>
      <form
        id="addProductForm"
        onSubmit={handleSubmit(onHandleSubmit, onHandleError)}
        className="grid grid-cols-2 gap-4"
      >
        <Input
          id="title"
          rules={{ required: "This field is required" }}
          required={true}
          register={register}
        >
          Film
        </Input>
        <Input id="time" type="number" register={register}>
          Yıl
        </Input>
        <Input id="director" register={register}>
          Yönetmen
        </Input>
        <Input id="cast" register={register}>
          Oyuncular
        </Input>
        <Select
          caption="Fantastik mi?"
          defaultValue="false"
          optionsArr={genreOptionsArr}
          id="genre"
          register={register}
        />
        <div className="col-span-2">
          <label className="mb-2 block">Poster</label>
          {currentImage && (
            <div className="mb-4">
              <img src={currentImage} alt="Current poster" className="mb-2" />
              <p>Current Image: {currentImage.split("/").pop()}</p>
            </div>
          )}
          <Input
            id="image"
            required={!editMode}
            rules={{ required: !editMode ? "This field is required" : false }}
            type="file"
            register={register}
          />
        </div>
        <Button
          disabled={isSubmitting}
          options={isSubmitting ? "bg-gray-300" : ""}
          type="primary"
        >
          {editMode ? "Değişiklikleri Onayla" : "Yeni Poster Ekle"}
        </Button>
      </form>
    </div>
  );
}

export default AddOrEditProductsForm;
