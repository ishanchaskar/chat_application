import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../../config/ChatLogic';
import Profile from './Profile';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChats = ({ fetchAgain, setfetchAgain }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();

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

            {/* Messages Here */}
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

