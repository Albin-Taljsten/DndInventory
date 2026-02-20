import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { test } from './domain'
import Inventory from "./ui/pages/InventoryPage";


function App() {

    test();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' />
                <Route path='/inventory' element={<Inventory />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
