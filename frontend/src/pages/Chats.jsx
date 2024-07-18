import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"; 
import SideDrawer from "../components/misc/SideDrawer"; 
import ChatBox from "../components/misc/ChatBox"; 
import MyChats from "../components/misc/MyChats";
import { useState } from "react";

const Chats = () => {
  const { user } = ChatState();
const[fetchAgain , setfetchAgain] = useState(false)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"  // Changed from d="flex" to display="flex"
        justifyContent="space-between"
        width="100%"  // Changed from w to width
        height="91.5vh"  // Changed from h to height
        padding="10px"  // Changed from p to padding
      >
        {user && <MyChats fetchAgain = {fetchAgain}/>}
        {user && <ChatBox fetchAgain = {fetchAgain}/>}
      </Box>
    </div>
  );
};

export default Chats;
