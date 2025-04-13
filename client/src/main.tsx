import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom font imports
const fontStyles = document.createElement("link");
fontStyles.rel = "stylesheet";
fontStyles.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&family=Space+Mono&display=swap";
document.head.appendChild(fontStyles);

// Add site title and metadata
const title = document.createElement("title");
title.textContent = "Universo Origen - Explorando los misterios del cosmos";
document.head.appendChild(title);

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
