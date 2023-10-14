import auth from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = new createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => signOut(auth);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email, uid: user.uid })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoading(false);
                        console.log('token message', data);
                    })
                    .catch(error => {
                        setLoading(false);
                        toast.error(error.message || 'Token creation failed')
                    })
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return unSub;
    }, [])

    const value = {
        user,
        loading,
        logIn,
        createAccount,
        logOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;