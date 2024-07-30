import { Outlet, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { signOut } from "../services/apiAuth";

function AdminPageLayout() {

  const navigate = useNavigate();


  function onHandleSignOut() {
    console.log("sign out");
    signOut();
    navigate("/");
  }
  return (
    <div className="flex flex-col h-screen bg-neutral-200">
      <header className="h-24 flex items-center">
        <div className="ml-auto mr-4">
        <Button type="secondary" handleOnClick={onHandleSignOut}>Çıkış yap</Button>
        </div>
      </header>
      <div className="bg-neutral-300 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPageLayout;
