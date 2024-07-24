/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useRef } from "react";
import { Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import Handlebars from "handlebars";

interface TemplatesProps {}

const Templates: FC<TemplatesProps> = () => {
  const editorRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  const onChangeSelect = (value: string) => {
    insertVariableAtCursor(value);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const insertVariableAtCursor = (text: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.focus();
      editor.execCommand("mceInsertContent", false, `{{${text}}}`);
    }
  };

  const handleRenderClick = () => {
    const template = Handlebars.compile(editorContent);
    const context = {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "Springfield",
    };
    const result = template(context);
    alert(result); // rendered template
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Select variable"
        optionFilterProp="label"
        onChange={onChangeSelect}
        options={[
          {
            value: "firstName",
            label: "First name",
          },
          {
            value: "lastName",
            label: "Last name",
          },
          {
            value: "street",
            label: "Street",
          },
          {
            value: "city",
            label: "City",
          },
        ]}
      />
      <Editor
        apiKey={import.meta.env.VITE_TINYEMC_API_KEY || undefined}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        //value={editorContent}
        init={{
          height: "50vh",
          placeholder: "Your template...",
          browser_spellcheck: true,
          content_style: `*::-webkit-scrollbar {width: 6px; background-color: transparent;} 
                        *::-webkit-scrollbar-track {display: none;} 
                        *::-webkit-scrollbar-thumb {border-radius: 10px; background: rgba(180, 188, 192, 1);} 
                        *::-webkit-scrollbar-thumb:hover {background: rgba(144, 155, 162, 1);}`,
          resize: false,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar_mode: "sliding",
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleRenderClick}>Render Template</button>
      <p>{`Enter an example text: Hello {{firstName}} {{lastName}}. Your address is {{street}}, {{city}}`}</p>
    </div>
  );
};

export default Templates;
