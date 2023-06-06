import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [arg, setArg] = useState();
  const [content, setContent] = useState();
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    arg,
    isShowing,
    content,
    toggle,
    setArg,
    setContent,
  };
};

export default useModal;
