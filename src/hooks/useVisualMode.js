import { useState } from "react";

/*  takes an initial argument to set the mode state and returns an object { mode, transition } */
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);

  /* to keep track of the history of the modes, so we can go backwards */
  const [history, setHistory] = useState([initial]);
 
  /* takes in a new mode and update the mode state with the new value */
  const transition = function(newMode) {
    setMode(newMode)
    setHistory(prev => [...prev, newMode])
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

