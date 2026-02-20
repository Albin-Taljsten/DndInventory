import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./scss/main.scss"
import "./scss/globals.scss";


const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);