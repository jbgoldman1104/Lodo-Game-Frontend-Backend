import React, { useEffect, useState } from "react";
import Dice from "../../Dice/Dice";
import setHome from "../../../utils/setHome";
import InitialHomeContainer from "../../InitialHomeContainer/InitialHomeContainer";
import FinalHomeContainer from "../../FinalHomeContainer/FinalHomeContainer";
import { useUserInfo } from "../../../context/GameInfo";
import { useTokenPositions } from "../../../context/TokenPosition";
import { useLocation, useParams } from "react-router-dom";
import { useWebSocket } from "../../../context/WebsocketProvider";
import { useWinner } from "../../../context/WinnerProvider";
import GameResults from "../../GameResults/GameResults";
import Message from "../../Message/Message";
import Boxes from "../../Boxes/Boxes";
import { WEBSOCKET_URL } from "../../../api/url";
import "./Game.css";

let Socket;
function Game() {
  useEffect(setHome, []);

  const location = useLocation();
  const { gameId } = useParams();
  const { createNewSocket } = useWebSocket();
  const { GameInfoState, setGameInfoState } = useUserInfo();
  const [animate, setAnimate] = useState(false);
  const { WinnerState } = useWinner();
  const winners = Object.entries(WinnerState);
  const { TokenPositions, setTokenPositions, checkForHome } =
    useTokenPositions();

  const {
    data: { beginedBy, usersOnRoom },
    myUserName,
  } = location.state;
  const [myColor, _] = Object.entries(usersOnRoom).find(
    ([color, user]) => user === myUserName
  );

  useEffect(() => {
    Socket = createNewSocket("gameSocket", `${WEBSOCKET_URL}/game/${gameId}/`);
    Socket.onmessage = ({ data }) => {
      data = JSON.parse(data);
      const { response } = data;
      // console.log(data);
      console.log(response);

      if (data["data-type"] === "initialize-game")
        setGameInfoState({ ...response });
      if (response["data-type"] === "token-position-changed")
        setTokenPositions({ ...response.data });
      if (response["data-type"] === "points-is-six")
        setGameInfoState({ ...response.data });
      if (response["data-type"] === "shuffle-turn")
        setGameInfoState({ ...GameInfoState, ...response.data });
      if (response["data-type"] === "user-rolled-dice") {
        setGameInfoState({ ...response.data });
        animateDice();
      }
    };
  }, []);

  useEffect(() => checkForHome(TokenPositions), [TokenPositions]);

  const animateDice = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  // console.log(gameId, beginedBy, usersOnRoom, myUserName, myColor);
  // console.log("my infos", myUserName, myColor);
  return (
    <div className="container">
      <Message message={`game successfully started by ${beginedBy}`} />
      <div className="gamePad">
        {winners.length === 3 && <GameResults winners={winners} />}
        <InitialHomeContainer
          myColor={myColor}
          user={usersOnRoom["red"]}
          color="Red"
        />
        <InitialHomeContainer
          myColor={myColor}
          user={usersOnRoom["green"]}
          color="Green"
        />
        <InitialHomeContainer
          myColor={myColor}
          user={usersOnRoom["blue"]}
          color="Blue"
        />
        <InitialHomeContainer
          myColor={myColor}
          user={usersOnRoom["yellow"]}
          color="Yellow"
        />

        <FinalHomeContainer />

        <Boxes myColor={myColor} />
      </div>
      <Dice myColor={myColor} animate={animate} />
    </div>
  );
}

export default Game;
