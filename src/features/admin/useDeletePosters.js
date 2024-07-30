import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePosterApi } from "../../services/apiPosterActionsAdmin";

function useDeletePosters() {
  const queryClient = useQueryClient();

  const { mutate: deletePoster, isLoading } = useMutation({
    mutationFn: (id) => {
      console.log("mutation id", id);
      return deletePosterApi(id);
    },
    onSuccess: () => {
      toast.success("product has been successfully deleted"),
        queryClient.invalidateQueries({
          queryKey: ["Admin_posters"],
        });
    },
    onError: (error) => {
      if (error.status === 409) {
        toast.error("Conflict: Product could not be deleted.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    },
  });

  return { deletePoster, isLoading };
}

export default useDeletePosters;
