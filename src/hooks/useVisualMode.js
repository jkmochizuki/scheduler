import { useState } from "react";

/*  takes an initial argument to set the mode state and returns an object */
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  /* takes in a new mode and a replace argument, updates the mode and history state with the new value */
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

