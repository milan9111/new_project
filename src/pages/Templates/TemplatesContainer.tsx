import { FC } from "react";
import Templates from "./Templates";

const TemplatesContainer: FC = () => {

  const onChangeTemplate = (content: string) => {
    console.log(content);
  }


  return (
      <Templates onChangeTemplate={onChangeTemplate}/>
  );
};

export default TemplatesContainer;
