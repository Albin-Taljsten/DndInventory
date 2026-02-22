import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    userId: number | null;
    setUserId: (id: number | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(() => {
        const stored = localStorage.getItem("userId");
        return stored ? Number(stored) : null;
    });

    const setUserIdAndStore = (id: number | null) => {
        setUserId(id)

        if (id === null) localStorage.removeItem("userId");
        else localStorage.setItem("userId", id.toString());
    }

    return (
        <AuthContext.Provider value={{ userId, setUserId: setUserIdAndStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}