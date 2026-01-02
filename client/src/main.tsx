import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .catch(() => {
                // Service worker registration failed, app will still work
            });
    });
}

createRoot(document.getElementById("root")!).render(<App />);
