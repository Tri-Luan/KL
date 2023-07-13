import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

const CkEditor = ({ CkEditorData, setCkEditorData }) => {
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
          items: ["bold", "italic", "code"],
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
  return (
    <CKEditor
      editor={Editor}
      data={CkEditorData}
      config={configurations}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "800px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setCkEditorData(data);
      }}
      onBlur={(event, editor) => {
        const data = editor.getData();
        setCkEditorData(data);
      }}
    />
  );
};

export default CkEditor;
