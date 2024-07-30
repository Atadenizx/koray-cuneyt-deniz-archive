/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import useUser from "../auth/useUser"

function ProtectedRouteAdmin({ children }) {
  // load the authenticated user
  const { user, isLoading, isFetching, userRole } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (!user || !userRole || userRole !== "admin") {
        console.log("navigating to log in from admin route");
        return navigate("/login");
      }
    }
  }, [isLoading, isFetching, user, navigate, userRole]);

  if (isLoading || isFetching)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (user && userRole === "admin") {
    return children;
  }

  return null;
}

export default ProtectedRouteAdmin;
