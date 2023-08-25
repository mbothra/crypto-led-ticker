import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './fonts/Alien-Encounters-Regular.ttf';
import './fonts/digital-7.ttf';
import './fonts/DOTMATRI.TTF';
import './fonts/game_over.ttf';
import './fonts/Gameplay.ttf';
import './font.css'

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
