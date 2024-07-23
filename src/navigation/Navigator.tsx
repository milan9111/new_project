import { Navigate, Route, Routes } from "react-router-dom";
import { EPageRoute } from "../types/enums/EPageRoute";
import SignInContainer from "../pages/SignIn/SignInContainer";
import FormsPage from "../pages/Forms/FormsPage";
import SettingParamsPage from "../pages/SettingParams/SettingParamsPage";
import SubMenuPage from "../pages/SubMenu/SubMenuPage";
import TemplatesPage from "../pages/Templates/TemplatesPage";
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
            <FormsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={EPageRoute.SETTING_PARAMS_ROUTE}
        element={
          <ProtectedRoute>
            <SettingParamsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={EPageRoute.SUB_MENU_ROUTE}
        element={
          <ProtectedRoute>
            <SubMenuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={EPageRoute.TEMPLATES_ROUTE}
        element={
          <ProtectedRoute>
            <TemplatesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={EPageRoute.NOTFOUND_PAGE_ROUTE} replace />}
      />
      <Route
        path={EPageRoute.NOTFOUND_PAGE_ROUTE}
        element={<NotFoundContainer />}
      />
    </Routes>
  </div>
);

export default Navigator;
