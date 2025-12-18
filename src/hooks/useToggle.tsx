import { useState } from "react";

export const useToggle = () => {
  const [state, setState] = useState(false);

  const toggleState = () => setState((prev) => !prev);

  const setIsTrue = () => setState(true);
  const setIsFalse = () => setState(false);

  return [state, toggleState, setIsFalse, setIsTrue] as const;
};
