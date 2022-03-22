import React from "react";
import ReactDOM from "react-dom/client";
import GameInfoProvider from "./context/GameInfo";
import TokenPositionProvider from "./context/TokenPosition";
import WinnerProvider from "./context/WinnerProvider";
import WebsocketProvider from "./context/WebsocketProvider";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WebsocketProvider>
        <WinnerProvider>
          <TokenPositionProvider>
            <GameInfoProvider>
              <App />
            </GameInfoProvider>
          </TokenPositionProvider>
        </WinnerProvider>
      </WebsocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
