import Button from "./Button";

function Modal({ editMode, setEditMode, setOpenModal, openModal, children }) {
  function onHandleClick() {
    editMode ? setEditMode(!editMode) : "";
    setOpenModal(!openModal);
  }
  return (
    <div className="relative h-full w-full rounded-md border border-gray-600 bg-gray-300 bg-opacity-40 bg-clip-padding p-20 backdrop-blur-md backdrop-filter">
      <div className="absolute right-12 top-12">
        <Button handleOnClick={onHandleClick}>X</Button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
