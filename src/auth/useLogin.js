import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      if (user?.user?.user_metadata?.role === "admin") navigate("/admin");
      else navigate("/")
    },
    onError: (error) => {
      console.log(error, "error");
      toast.error("provided creditenials are incorrect");
    },
  });

  return { login, isLoading };
}

export default useLogin;
