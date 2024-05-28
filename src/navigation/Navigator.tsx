import { Navigate, Route, Routes } from "react-router-dom";
import { EPageRoute } from "../types/enums/EPageRoute";
import FormsContainer from "../pages/Forms/FormsContainer";
import SignInContainer from "../pages/SignIn/SignInContainer";
import NotFoundContainer from "../pages/NotFound/NotFoundContainer";
import { ProtectedRoute } from "./ProtectedRoute";


const Navigator = () => (
  <div>
    <Routes>
      <Route
        path={EPageRoute.SIGN_IN_PAGE_ROUTE}
        element={<SignInContainer />}
      />
      <Route
        path={EPageRoute.FORMS_PAGE_ROUTE}
        element={
          <ProtectedRoute>
            <FormsContainer />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={EPageRoute.NOTFOUND_PAGE_ROUTE} replace />}
      />
      <Route path={EPageRoute.NOTFOUND_PAGE_ROUTE} element={<NotFoundContainer />} />
    </Routes>
  </div>
);

export default Navigator;
