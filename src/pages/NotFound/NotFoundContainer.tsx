import { FC } from "react";
import useGoHomeByClick from "../../hooks/useGoHomeByClick";
import NotFound from "./NotFound";

const NotFoundContainer: FC = () => {
  const goHomeHandler = useGoHomeByClick();

  return <NotFound goHomeHandler={goHomeHandler} />;
};

export default NotFoundContainer;
