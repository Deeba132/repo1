import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as settingApi } from "../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const client = useQueryClient();
  const { mutate: updateSetting, isLoading: settingload } = useMutation({
    mutationFn: settingApi,
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      client.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, settingload };
}
