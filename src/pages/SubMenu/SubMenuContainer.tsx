import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IField } from "../../types/interfaces/ISubMenu";
import { ESubMenuFieldType } from "../../types/enums/ESubMenuFieldType";
import { getSubMenu } from "../../store/actions/subMenuActions";
import {
  setDefaultOpenKeys,
  setDefaultSelectedKeys,
} from "../../store/reducers/MenuSlice";
import { setSubMenu } from "../../store/reducers/SubMenuSlice";
import useAbortableEffect from "../../hooks/useAbortableEffect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getDefaultOpenKeys } from "../../helpers/getDefaultOpenKeys";
import LayoutContainer from "../../components/Layout/LayoutContainer";
import SubMenu from "./SubMenu";
import styles from "./subMenu.module.scss";
import { Button } from "antd";

const SubMenuContainer: FC = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const { subMenu, loadingSubMenu } = useAppSelector((state) => state.subMenu);
  const dispatch = useAppDispatch();
  const { key } = useParams();

  const handleCleanup = () => {
    dispatch(setSubMenu(null));
  };

  useAbortableEffect(
    async (abortController: AbortController) => {
      dispatch(getSubMenu(abortController, key as string));
    },
    [],
    [handleCleanup]
  );

  useEffect(() => {
    dispatch(setDefaultSelectedKeys([key as string]));
    dispatch(setDefaultOpenKeys(getDefaultOpenKeys(menu, key as string)));
  }, [menu]);

  const renderRow = (fields: IField[]) => {
    if (fields.length) {
      const createdRow = fields.map((item, index) => {
        if (item.rowItemType === ESubMenuFieldType.Label) {
          if (fields.length === 1) {
            return (
              <p
                key={index}
                className={
                  item.column !== 0
                    ? styles.titleRowCenter
                    : styles.titleRowStart
                }
              >
                {item.text}
              </p>
            );
          } else {
            return null;
          }
        }
        if (item.rowItemType === ESubMenuFieldType.Button) {
          return (
            <Button key={index} type="primary">{item.text}</Button>
          );
        }
        if (item.rowItemType === ESubMenuFieldType.Label) {
          return (
           <p>{item.text}</p>
          );
        }
      });
      return createdRow;
    } else {
      return <div className={styles.emptyRow}></div>;
    }
  };

  const renderForm =
    !loadingSubMenu && subMenu
      ? subMenu.form.rows.map((item) => {
          return (
            <div key={item.row} className={styles.row}>
              {renderRow(item.fields)}
            </div>
          );
        })
      : [];

  return (
    <LayoutContainer>
      <SubMenu
        loadingSubMenu={loadingSubMenu}
        subMenu={subMenu}
        renderForm={renderForm}
      />
    </LayoutContainer>
  );
};

export default SubMenuContainer;
