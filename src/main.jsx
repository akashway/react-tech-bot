import { createRoot } from "react-dom/client"
import {BrowserRouter} from "react-router-dom"
import App from "./App.jsx"
import "highlight.js/styles/atom-one-dark.css"

import './index.css'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
