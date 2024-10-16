"use client";

import { createContext, useState } from "react";

const GameConfigStateContext = createContext();

export const GameConfigStateContextProvider = ({ children }) => {
  const [maxRounds, setMaxRounds] = useState(6);
  const [wordsList, setWordsList] = useState([
    "APPLE",
    "BAKER",
    "CANDY",
    "DELTA",
    "EAGLE",
  ]);

  return (
    <GameConfigStateContext.Provider
      value={{ maxRounds, setMaxRounds, wordsList, setWordsList }}
    >
      {children}
    </GameConfigStateContext.Provider>
  );
};

export default GameConfigStateContext;
