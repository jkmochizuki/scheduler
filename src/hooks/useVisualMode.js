import { useState } from "react";

/*  takes an initial argument to set the mode state and returns an object { mode, transition } */
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);

  /* to keep track of the history of the modes, so we can go backwards */
  const [history, setHistory] = useState([initial]);
 
  /* takes in a new mode and a replace argument, updates the mode and history state with the new value */
  const transition = function(mode, replace = false) {
    setMode(mode);
      
    /* when replace is true then set the history to reflect that we are replacing the current mode, not adding a new mode */
    replace ? setHistory(prev => [...prev.slice(0, prev.length - 1), mode]) :
    setHistory(prev => [...prev, mode]);
  }
 
  /* sets the mode to the previous item in the history array */
  const back = function() {
    if (history.length > 1) { // to not allow the user to go back past the initial mode
      const newHistory = [...history];
      newHistory.pop(); // removes the last mode in the history array

      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  return { mode, history, transition, back };
}

