import React, { useContext, createContext, useState } from "react";

const Winner = createContext();

const WinnerProvider = ({ children }) => {
  const [WinnerState, setWinnerState] = useState({});

  return (
    <Winner.Provider value={{ WinnerState, setWinnerState }}>
      {children}
    </Winner.Provider>
  );
};

export const useWinner = () => useContext(Winner);
export default WinnerProvider;
