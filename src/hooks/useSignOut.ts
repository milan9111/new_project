import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EPageRoute } from "../types/enums/EPageRoute";

const useSignOut = () => {
  const navigate = useNavigate();

  return useCallback(
    (navigateToSignInPage: boolean): void => {
      localStorage.clear();
      if (navigateToSignInPage) navigate(EPageRoute.SIGN_IN_PAGE_ROUTE);
    },
    [navigate]
  );
};

export default useSignOut;
