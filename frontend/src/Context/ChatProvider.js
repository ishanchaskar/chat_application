import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(UserInfo);
        if (!UserInfo) {
            navigate('/');
        }
    }, [navigate]); // Added navigate to the dependency array
    
    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
