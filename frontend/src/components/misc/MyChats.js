import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

function MyChats() {
  const [loggedUser, setloggedUser] = useState();
  const toast = useToast()
  const { user , setSelectedChat , chats, setChats } = ChatState();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`,
      }
      }
      const data = await axios.get("/api/chat" , config)
      setChats(data)
    } catch (error) {
      toast({
        title:"Error occured",
        description: "failed to the chats",
        status: "error",
        duration : 5000,
        isClosable: true,
        position :"bottom-leftt"
      })
    }
  }
  return (
    <div>MyChats</div>
  )
}

export default MyChats