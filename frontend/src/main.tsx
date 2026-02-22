import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./scss/main.scss"
import "./scss/globals.scss";
import { AuthProvider } from './ui/context/AuthContext.tsx';


const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);