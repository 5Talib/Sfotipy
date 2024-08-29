import { createContext } from "react";
// setting the initial values when page is loaded

const songContext = createContext({ 
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
});

export default songContext;
