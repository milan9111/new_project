/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useRef } from "react";
import { Select, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import Handlebars from "handlebars";

interface TemplatesProps {}

const Templates: FC<TemplatesProps> = () => {
  const editorRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [currentContext, setCurrentContext] = useState<any>(null);

  const onChangeVariable = (value: string) => {
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

  const persons = [
    {
      id: 1,
      firstName: "Tyrion",
      lastName: "Lannister",
      street: "Street 1",
      city: "Red Keep",
    },
    {
      id: 2,
      firstName: "Jon",
      lastName: "Snow",
      street: "Street 2",
      city: "Winterfell",
    },
    {
      id: 3,
      firstName: "Daenerys",
      lastName: "Targaryen",
      street: "Street 3",
      city: "Dragonstone",
    },
  ];

  const handleRenderClick = () => {
    const template = Handlebars.compile(editorContent);
    if (currentContext) {
      const result = template(currentContext);
      alert(result); // rendered template
    } else {
      alert("Choose a person!");
    }
  };

  const onChangePerson = (value: number) => {
    const foundPerson = persons.find((item) => item.id === value);

    if (foundPerson) {
      setCurrentContext(foundPerson);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Select variable"
        optionFilterProp="label"
        onChange={onChangeVariable}
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
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Select person"
        optionFilterProp="label"
        onChange={onChangePerson}
        options={[
          {
            value: 1,
            label: "Tyrion Lannister",
          },
          {
            value: 2,
            label: "Jon Snow",
          },
          {
            value: 3,
            label: "Daenerys Targaryen",
          },
        ]}
      />
      <Button type="primary" onClick={handleRenderClick} style={{ width: 300 }}>
        Render Template
      </Button>
      <p>{`Enter an example text: Hello {{firstName}} {{lastName}}. Your address is {{street}}, {{city}}`}</p>
    </div>
  );
};

export default Templates;
