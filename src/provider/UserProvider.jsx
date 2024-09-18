import  { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create a Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

     // Initialize user from localStorage
     useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user from localStorage:", parsedUser);
        setUser(parsedUser);
        }
    }, []);

    // Update localStorage when user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
