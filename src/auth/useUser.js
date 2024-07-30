import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth"

function useUser() {
  const {
    isLoading,
    isFetching,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 30 * 1000,
  });

  let userRole = undefined;

  try {
    if (error) throw new Error(error.message);

    userRole = user?.user?.user_metadata?.role;
  } catch (err) {
    console.error("An error occurred:", err.message);
  } finally {
    if (userRole === undefined) {
      console.log("user role is undefined");
    }
  }
  return { user, isLoading, isFetching, userRole };
}

export default useUser;
