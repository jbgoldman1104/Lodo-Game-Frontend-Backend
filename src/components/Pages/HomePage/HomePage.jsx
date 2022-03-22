import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postRequest from "../../../api/postRequest";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    roomName: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleClick = async (e, mode) => {
    e.preventDefault();
    let res = await postRequest("create-or-verify/", { mode, ...inputValue });
    res = await res.json();
    if (res.success) {
      navigate(`/room/${inputValue.roomName}/`, {
        state: { userName: inputValue.name },
      });
    }
    setError(res.message);
  };

  return (
    <div className="home-page">
      <h2>Enter Room Info</h2>
      <div className="error">{error}</div>
      <form action="">
        <input
          placeholder="Enter room name"
          value={inputValue.roomName}
          onChange={({ target }) =>
            setInputValue({ ...inputValue, roomName: target.value })
          }
        />
        <input
          type="password"
          placeholder="Enter room password"
          value={inputValue.password}
          onChange={({ target }) =>
            setInputValue({ ...inputValue, password: target.value })
          }
        />
        <input
          placeholder="Enter Your name"
          value={inputValue.name}
          onChange={({ target }) =>
            setInputValue({ ...inputValue, name: target.value })
          }
        />
        <button onClick={(e) => handleClick(e, "join")}>JoinRoom</button>
        <button onClick={(e) => handleClick(e, "create")}>CreateRoom</button>
      </form>
    </div>
  );
};

export default HomePage;
