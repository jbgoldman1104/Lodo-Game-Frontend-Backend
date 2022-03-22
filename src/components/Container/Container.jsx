import React from "react";
import InitialHomeContainer from "../InitialHomeContainer/InitialHomeContainer";
import FinalHomeContainer from "../FinalHomeContainer/FinalHomeContainer";
import Boxes from "../Boxes/Boxes";
import "./Container.css";

const Container = () => {
  return (
    <div className="container">
      <div className="gamePad">
        <InitialHomeContainer color="Red" />
        <InitialHomeContainer color="Green" />
        <InitialHomeContainer color="Blue" />
        <InitialHomeContainer color="Yellow" />

        <FinalHomeContainer />

        <Boxes />
      </div>
    </div>
  );
};

export default Container;
