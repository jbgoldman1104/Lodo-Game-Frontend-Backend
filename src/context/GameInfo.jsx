import React, { useState, createContext, useContext, useEffect } from "react";
import { useTokenPositions } from "./TokenPosition";
import { useWebSocket } from "./WebsocketProvider";
import { getNextTurn } from "../utils/getNextTurn";
import { useWinner } from "./WinnerProvider";

const userInfoContext = createContext();

const GameInfoProvider = ({ children }) => {
  const { pathAvailable } = useTokenPositions();
  const { sendToSocket, webSockets } = useWebSocket();
  const { WinnerState } = useWinner();

  const [GameInfoState, setGameInfoState] = useState({
    turn: "Red",
    points: 0,
    rolledDice: false,
    changedIdentifier: Math.random(),
  });

  useEffect(() => {
    const { turn, points } = GameInfoState;
    if (GameInfoState.points !== 0 && !pathAvailable("__all__", turn, points))
      setTimeout(() => shuffleTurn(), 500);
  }, [GameInfoState.changedIdentifier]);

  const shuffleTurn = () => {
    const { turn } = GameInfoState;
    const allTurns = ["Red", "Green", "Yellow", "Blue"];
    const winners = Object.keys(WinnerState);
    const availableTurns = allTurns.filter((value) => !winners.includes(value));

    const newTurn = getNextTurn(allTurns, availableTurns, turn);

    sendToSocket(webSockets["gameSocket"], {
      "data-type": "shuffle-turn",
      data: {
        turn: newTurn,
        rolledDice: false,
      },
    });
  };

  return (
    <userInfoContext.Provider
      value={{ GameInfoState, setGameInfoState, shuffleTurn }}
    >
      {children}
    </userInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(userInfoContext);
export default GameInfoProvider;
