import { useState } from "react";

const useCkEditor = () => {
  const [CkEditorData, setCkEditorData] = useState("");
  return {
    CkEditorData,
    setCkEditorData,
  };
};

export default useCkEditor;
