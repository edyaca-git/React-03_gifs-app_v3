import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setcounter] = useState(initialValue);

  const handleAdd = () => {
    setcounter(counter + 1);
  };

  const handleSubtract = () => {
    setcounter((previousState) => previousState - 1);
  };

  const handleReset = () => {
    setcounter(initialValue);
  };

  return {
    // values o propiedades
    counter,
    // methods / actions
    handleAdd,
    handleSubtract,
    handleReset,
  }
};
