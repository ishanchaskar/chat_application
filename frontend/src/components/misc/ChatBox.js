import React from 'react'
import {ChatState} from "../../Context/ChatProvider"
import { Box } from '@chakra-ui/react';
import SingleChats from './SingleChats';
function ChatBox({fetchAgain  ,  setfetchAgain}) {
const {selectedChat} = ChatState();
  return (
    <Box
    display={{base : selectedChat ? "flex" : "none" , md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{base : "100%" , md:"68ज्ञ"}}
    borderRadius="lg"
    borderWidth="1px"
    ><SingleChats fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain}/></Box>
  )
}

export default ChatBox