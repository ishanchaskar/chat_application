import React, { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/ChatLogic';
import Profile from './Profile';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChats = ({ fetchAgain, setfetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  const [messages , setmessages] = useState([])
  const [loading, setloading] = useState(false);
  const [newmessage, setnewmessage] = useState([]);
const sendMessage =() =>{}
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
              <div>Messages here</div>
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

