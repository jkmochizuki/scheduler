import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  /* updates the mode and history state with the new mode */
  const transition = function(mode, replace = false) {
    setMode(mode);

    replace ?
    setHistory(prev => [...prev.slice(0, prev.length - 1), mode]) :
    setHistory(prev => [...prev, mode]);
  }
 
  /* sets the mode to the previous item in the history array */
  const back = function() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();

      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  
  return { mode, history, transition, back };
}

