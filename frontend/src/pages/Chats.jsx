import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"; 
import SideDrawer from "../components/misc/SideDrawer"; 
import ChatBox from "../components/misc/ChatBox"; 
import MyChats from "../components/misc/MyChats";

const Chats = () => {
  const { user } = ChatState();

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
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
