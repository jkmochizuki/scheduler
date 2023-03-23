import { useState } from "react";

/*  takes an initial argument to set the mode state and returns an object { mode, transition } */
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
 
  /* takes in a new mode and update the mode state with the new value */
  const transition = function(mode) {
    setMode(prev => mode)
  }
  return { mode, transition };
}

