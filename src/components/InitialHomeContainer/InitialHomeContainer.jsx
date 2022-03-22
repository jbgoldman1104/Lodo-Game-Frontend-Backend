import React from "react";
import Token from "../Token/Token";
import { useUserInfo } from "../../context/GameInfo";
import { useTokenPositions } from "../../context/TokenPosition";
import { useWinner } from "../../context/WinnerProvider";
import "./InitialHomeContainer.css";

const InitialHomeContainer = ({ color, myColor, user }) => {
  const { TokenPositions } = useTokenPositions();
  const { GameInfoState } = useUserInfo();
  const { turn, points, rolledDice } = GameInfoState;
  const { WinnerState } = useWinner();

  const shouldTokenBeDisabled = () => {
    if (
      turn.toLowerCase() === myColor &&
      turn === color &&
      points === 6 &&
      rolledDice
    )
      return false;
    return true;
  };

  return (
    <div className={`initial-home-container ${color.toLowerCase()}`}>
      <div className="initial-home-wrapper">
        <p>{user}</p>
        <div className="initial-home">
          {WinnerState[color] ? <div>{WinnerState[color]} Winner</div> : ""}

          {TokenPositions[color]?.map((position, positionIndex) => (
            <div
              key={positionIndex}
              className={`initial-token-container ${color.toLowerCase()}`}
            >
              {position === null ? (
                <Token
                  color={color}
                  disable={shouldTokenBeDisabled()}
                  positionIndex={positionIndex}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialHomeContainer;
