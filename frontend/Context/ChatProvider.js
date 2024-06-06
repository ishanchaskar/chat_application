import {createContext , useContext} from 'react';
const ChatContext = createContext();

const ChatProvider = ({children}) => {
    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}

useContext(ChatContext)
export default ChatProvider;