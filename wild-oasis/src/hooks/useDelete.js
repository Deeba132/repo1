import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletecabin as deleteCabinApi } from "../services/apiCabins";

export default function useDelete() {
  const queryClient = useQueryClient();
  const { isLoading: isdeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Successfull delete");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isdeleting, deleteCabin };
}
