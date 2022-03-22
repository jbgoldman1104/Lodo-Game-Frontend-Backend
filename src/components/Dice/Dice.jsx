import React from "react";
import { useUserInfo } from "../../context/GameInfo";
import { useWebSocket } from "../../context/WebsocketProvider";
import classes from "./Dice.module.css";

const Dice = ({ myColor, animate, Socket }) => {
  const { GameInfoState } = useUserInfo();
  const { turn, points } = GameInfoState;
  const { sendToSocket, webSockets } = useWebSocket();

  const handleDiceClick = () => {
    const randomNumber = Math.ceil(Math.random() * 6);
    sendToSocket(webSockets["gameSocket"], {
      "data-type": "user-rolled-dice",
      data: {
        ...GameInfoState,
        points: randomNumber,
        rolledDice: true,
        changedIdentifier: Math.random(),
      },
    });
  };

  return (
    <div className={classes["dice-container"]}>
      <p>{turn}'s Turn</p>
      <div
        style={{
          pointerEvents: myColor === turn.toLowerCase() ? "all" : "none",
        }}
        className={`${classes.dice}${animate ? " animate" : ""}`}
        onClick={handleDiceClick}
      >
        {[...Array(points)].map((_, i) => (
          <div key={i} className={classes["dice-dot"]}></div>
        ))}
      </div>
    </div>
  );
};

export default Dice;
