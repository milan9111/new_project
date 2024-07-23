import { FC, useRef } from "react";
import SunEditor, {buttonList} from "suneditor-react";
import SunEditorCore from 'suneditor/src/lib/core';
import "suneditor/dist/css/suneditor.min.css";
import { en } from 'suneditor/src/lang';


interface TemplatesProps {
    onChangeTemplate: ((content: string) => void) | undefined;
}

const Templates: FC<TemplatesProps> = ({onChangeTemplate}) => {
    const editor = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

  return (
    <div>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        lang={en}
        name="templates"
        onChange={onChangeTemplate}
        setOptions={{
            height: '50vh',
            buttonList: buttonList.complex,
        }}
      />
    </div>
  );
};

export default Templates;
