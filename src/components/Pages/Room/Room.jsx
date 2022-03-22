import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "../../../context/WebsocketProvider";
import { WEBSOCKET_URL } from "../../../api/url";
import "./Room.css";

const Room = () => {
  const { createNewSocket, sendToSocket, webSockets } = useWebSocket();
  const navigate = useNavigate();
  const { roomName } = useParams();
  const location = useLocation();
  const myUserName = location.state.userName;

  const [usersOnRoom, setUsersOnRoom] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    let Socket = createNewSocket(
      "roomSocket",
      `${WEBSOCKET_URL}/room/${roomName}/${myUserName}/`
    );

    Socket.onmessage = ({ data }) => {
      let res = JSON.parse(data);

      if (!res.error && res["data-type"] === "begin-game") {
        const { gameId } = res;
        Socket.close();
        navigate(`/game/${gameId}/`, {
          state: { gameId, data: res.data, myUserName },
        });
      } else if (!res.error) setUsersOnRoom({ ...res.data });
    };
  }, []);

  const handleUserColorChange = ({ target }) => {
    const newValue = target.value;
    const user = usersOnRoom[newValue];

    const [myPrevValue, _] = Object.entries(usersOnRoom).find(
      (keyValue) => keyValue[1] === myUserName
    );

    let newState = { ...usersOnRoom, [newValue]: myUserName };
    newState = { ...newState, [myPrevValue]: user };

    sendToSocket(webSockets["roomSocket"], {
      "data-type": "user-change-color",
      data: newState,
    });
  };

  const beginGame = () => {
    const nullUserIndex = Object.values(usersOnRoom).findIndex(
      (user) => user === null
    );

    if (nullUserIndex < 0)
      sendToSocket(webSockets["roomSocket"], {
        "data-type": "begin-game",
        data: { usersOnRoom, beginedBy: myUserName },
      });
    else setError("All users not in the room");
  };

  return (
    <div className="room-container">
      <h3>Room: {roomName}</h3>
      <h3>Player's List:</h3>
      <table>
        <tbody>
          <tr>
            <th>Player's Name</th>
            <th>Color</th>
          </tr>
          {Object.keys(usersOnRoom).map((userColor) => (
            <tr key={userColor}>
              <td>{usersOnRoom[userColor]}</td>
              <td>
                <div className={`color-sample ${userColor}`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="error">{error}</div>

      <select onChange={(e) => handleUserColorChange(e)}>
        <option value="">---- PickColor ----</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
      </select>
      <button onClick={beginGame}>Begin Game</button>
    </div>
  );
};

export default Room;
