import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [arg, setArg] = useState();
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    arg,
    isShowing,
    toggle,
    setArg,
  };
};

export default useModal;
