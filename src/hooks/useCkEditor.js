import { useState } from "react";

const useCkEditor = () => {
  const [CkEditorData, setCkEditorData] = useState(null);
  return {
    CkEditorData,
    setCkEditorData,
  };
};

export default useCkEditor;
