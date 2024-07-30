import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);

  return <div>Page not Found </div>;
}

export default PageNotFound;
