import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addOrEditPosterApi } from "../../services/apiPosterActionsAdmin";

function useAddPosters() {
  const queryClient = useQueryClient();
  const { mutate: addPoster, isLoading } = useMutation({
    mutationFn: ({ poster }) => addOrEditPosterApi({ poster }),
    onSuccess: () => {
      toast.success("new produc has been successfully added"),
        queryClient.invalidateQueries({
          queryKey: ["Admin_posters"],
        });
    },
  });

  return { addPoster, isLoading };
}

export default useAddPosters;
