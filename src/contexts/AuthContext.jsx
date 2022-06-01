import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)


export function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);

            if (!user) {
                navigate("/", {replace: true});
            }
        })
    }, [user, navigate])
    
    return (
        <AuthContext.Provider value={{user}} >
            {!loading && children}
        </AuthContext.Provider>
    )
}
