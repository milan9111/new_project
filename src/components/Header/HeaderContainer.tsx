import { FC } from "react";
import { Button, MenuProps } from "antd";
import Header from "./Header";
import { useAppSelector } from "../../hooks/redux";

const HeaderContainer: FC = () => {
  const { currentScreenIndex, screensNamesForInput } = useAppSelector(
    (state) => state.forms
  );

  const items: MenuProps["items"] = [
    {
      label: (
        <Button type="text" danger>
          Logout
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Header
      items={items}
      formName={screensNamesForInput[currentScreenIndex]?.label || ""}
    />
  );
};

export default HeaderContainer;
