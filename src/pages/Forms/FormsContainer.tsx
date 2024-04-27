import { FC } from "react";
import fakeStore from '../../store/fakeStore.json';
import Forms from "./Forms";

const FormsContainer: FC = () => {

  console.log(fakeStore[1]);

  return <Forms />;
};

export default FormsContainer;
