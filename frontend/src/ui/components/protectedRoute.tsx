import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useAuth();

    if (!userId) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;