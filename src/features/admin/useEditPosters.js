import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPosterApi } from "../../services/apiPosterActionsAdmin";

function useEditPosters() {
  const queryClient = useQueryClient();
  const { mutate: editPoster, isLoading } = useMutation({
    mutationFn: ({ poster, id }) => editPosterApi({ poster, id }),
    onSuccess: () => {
      toast.success("product has been successfully edited"),
        queryClient.invalidateQueries({
          queryKey: ["Admin_posters"],
        });
    },
  });

  return { editPoster, isLoading };
}

export default useEditPosters;
