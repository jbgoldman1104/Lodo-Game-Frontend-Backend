import React, { useEffect } from "react";
import { useTokenPositions } from "../../context/TokenPosition";
import { useUserInfo } from "../../context/GameInfo";
import { paths } from "../../utils/TokenPath";
import { useWebSocket } from "../../context/WebsocketProvider";
import "./Token.css";

const Token = ({ color, myColor, disable = true, positionIndex }) => {
  const { sendToSocket, webSockets } = useWebSocket();
  const { GameInfoState, shuffleTurn } = useUserInfo();
  const { TokenPositions, checkForOut } = useTokenPositions();
  const { points, turn } = GameInfoState;

  const moveToken = (positionIndex, color) => {
    const CurrentActiveTokensPositions = TokenPositions[color];
    const tokenPositionValue = CurrentActiveTokensPositions[positionIndex];

    // Brings new position for clicked token from token's path on the basis of previous positon and points gained
    const newTokenPosition =
      tokenPositionValue === null
        ? paths[color][0]
        : paths[color][paths[color].indexOf(tokenPositionValue) + points];

    CurrentActiveTokensPositions[positionIndex] = newTokenPosition;

    //checkForOut check if any token is out and returns new positions for tokens
    const newPositions = checkForOut(
      TokenPositions,
      newTokenPosition,
      color,
      CurrentActiveTokensPositions
    );

    // Send the data to backend
    sendToSocket(webSockets["gameSocket"], {
      "data-type": "token-position-changed",
      data: { ...newPositions },
    });
  };

  useEffect(() => {
    if (points !== 0 && points !== 6 && turn.toLowerCase() === myColor)
      shuffleTurn();
    if (points === 6)
      sendToSocket(webSockets["gameSocket"], {
        "data-type": "points-is-six",
        data: { ...GameInfoState, rolledDice: false },
      });
  }, [TokenPositions]);

  return (
    <button
      disabled={disable}
      className={`token ${color.toLowerCase()}`}
      onClick={() => moveToken(positionIndex, color)}
    ></button>
  );
};

export default Token;
