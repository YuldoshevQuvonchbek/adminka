import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FieldType } from "../../login";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request
        .post("/api/admin-login/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
  });
};
