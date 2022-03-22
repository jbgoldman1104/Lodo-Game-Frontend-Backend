import React from "react";
import { boxesClassList } from "./utils";
import { useTokenPositions } from "../../context/TokenPosition";
import { useUserInfo } from "../../context/GameInfo";
import { arrayFromRepetaions } from "../../utils/countRepetions";
import Token from "../Token/Token";
import "./Boxes.css";

function Boxes({ myColor }) {
  const { TokenPositions, pathAvailable } = useTokenPositions();
  const { GameInfoState } = useUserInfo();
  const { turn, rolledDice, points } = GameInfoState;

  const Tokens = Object.entries(TokenPositions);

  const shouldTokenBeDisabled = (tokenColor, tokenPositions, boxIndex) => {
    if (
      turn.toLowerCase() === myColor &&
      turn === tokenColor &&
      rolledDice &&
      pathAvailable(tokenPositions.indexOf(boxIndex), tokenColor, points)
    )
      return false;
    return true;
  };

  return (
    <>
      {boxesClassList.map((boxClass, boxIndex) => (
        <div key={boxIndex} className={boxClass}>
          {Tokens.map(([tokenColor, tokenPositions], idx) =>
            arrayFromRepetaions(boxIndex, tokenPositions).map((_, i) => (
              <Token
                key={i}
                color={tokenColor}
                myColor={myColor}
                positionIndex={tokenPositions.indexOf(boxIndex)}
                disable={shouldTokenBeDisabled(
                  tokenColor,
                  tokenPositions,
                  boxIndex
                )}
              />
            ))
          )}
        </div>
      ))}
    </>
  );
}

export default Boxes;
