import React, { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/ChatLogic';
import Profile from './Profile';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import "./styles.css"
import ScrollableChat from './ScrollableChat';
const SingleChats = ({ fetchAgain, setfetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  const [messages , setmessages] = useState([])
  const [loading, setloading] = useState(false);
  const [newmessage, setnewmessage] = useState([]);
  const toast = useToast();
const sendMessage =async (event) =>{
  if(event.key === "Enter" && newmessage){
    try {
      const config = 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      setnewmessage("")
      const {data} =  await axios.post("http://localhost:5000/api/message/" , {
        content : newmessage,
        chatId: selectedChat._id
      }, config)
      console.log(data)
      setmessages([...messages , data])
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
}
const fetchMessage = async () => {
  if(!selectedChat) return
  try {
    const config = 
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    }
    setloading(true)
    const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}` , config)
    setmessages(data)
    setloading(false)
    console.log(messages)
  } catch (error) {
    toast({
      title: "Error Occured",
      description: "Failed to send the message",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }

}
useEffect(() => {
  fetchMessage()
}, [selectedChat]);
const typingHandler =(e) =>{
  setnewmessage(e.target.value)
}

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="sans-serif"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user ={ getSenderFull(user , selectedChat.users)}/>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setfetchAgain={setfetchAgain}
                  fetchMessage = {fetchMessage}
                />
              </>
            )}
          </Text>
          <Box 
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflow="hidden"
          >
            {loading ? (
              <Spinner
              alignSelf='center'
              size='xl'
              w={20}
              h={20}
              margin='auto'
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages}/>
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input bg="#E0E0E0" placeholder='enter message here..' variant="filled" onChange={typingHandler} value={newmessage}/>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="2xl" pb={3} fontFamily="sans-serif">
            Click on a user to start
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChats;

