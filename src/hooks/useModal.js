import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [arg, setArg] = useState();
  const [content, setContent] = useState();
  const [results, setResults] = useState();
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    arg,
    isShowing,
    content,
    results,
    toggle,
    setArg,
    setContent,
    setResults,
  };
};

export default useModal;
