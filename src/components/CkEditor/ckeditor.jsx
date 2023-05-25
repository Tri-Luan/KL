import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";

const CkEditor = (props) => {
  const configurations = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        {
          label: "Fonts",
          icon: "text",
          items: ["fontsize", "fontColor", "fontBackgroundColor"],
        },
        "|",
        {
          label: "Basic styles",
          icon: "bold",
          items: [
            "bold",
            "italic",
            // "strikethrough",
            // "subscript",
            // "superscript",
            "code",
          ],
        },
        "|",
        "link",
        "uploadImage",
        "blockQuote",
        "codeBlock",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        // "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
  const [objectiveCkData, setObjectiveCkData] = useState(props.objectiveCkData);
  const sendData = () => {
    props.callBack(objectiveCkData);
  };
  return (
    <CKEditor
      editor={Editor}
      data={objectiveCkData}
      config={configurations}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "800px",
            editor.editing.view.document.getRoot()
          );
        });
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        // console.log(data.length);
        setObjectiveCkData(data);
        sendData();
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default CkEditor;
