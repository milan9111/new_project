import { FC } from "react";
import styles from './customText.module.scss';

interface CustomTextProps {
  text: string;
}

const CustomTex: FC<CustomTextProps> = ({ text }) => {
  return <p className={styles.text}>{text}</p>;
};

export default CustomTex;
