import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const UserInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUser(UserInfo);
      if (!UserInfo) {
        navigate('/');
      }
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      navigate('/');
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
