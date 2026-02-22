import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InventoryPage from "./ui/pages/InventoryPage";
import LoginPage from './ui/pages/LoginPage';
import ProtectedRoute from './ui/components/protectedRoute';


function App() {
    // AuthContext exists around the app right now
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />}/>
                <Route 
                    path='/inventory' 
                    element={
                        <ProtectedRoute>
                            <InventoryPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App
