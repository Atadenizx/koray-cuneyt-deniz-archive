import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";

function Applayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header className="fixed left-0 top-0 z-10 w-full" />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Applayout;
