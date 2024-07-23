import { FC } from "react";
import TemplatesContainer from "./TemplatesContainer";
import LayoutContainer from "../../components/Layout/LayoutContainer";

const TemplatesPage: FC = () => {
  return (
    <LayoutContainer>
      <TemplatesContainer />
    </LayoutContainer>
  );
};

export default TemplatesPage;
