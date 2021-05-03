import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { goTo } from "../routes/Coordinator";

export const useProtectedPage = () => {
  const history = useHistory();

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      goTo(history,"/Login","")
    }
  }, [history])
}