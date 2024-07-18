import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

const SingleChats = ({fetchAgain ,setfetchAgain}) => {
  const { user ,setSelectedChat ,selectedChat} = ChatState()
    return (
        <>
    {selectedChat ? (
        <> 
        <Text
        fontSize={{base: "28px" , md : "30px"}}
        pb={3}
        px={2}
        w="100%"
        fontFamily="sans-serif"
        justifyContent={{base : "space-between"}}
        alignItems="center"
        >
          <IconButton
          d={{base : "flex" , md :"none"}}
          icon={<ArrowBackIcon/>}
          onClick={() => setSelectedChat("")}
          />
          {!selectedChat.isGroupChat ?  (
           <></> 
          ) : (
            {selectedChat.chatName.toUpperCase()}
            <UpdateGroupChatModal
            fetchAgain={fetchAgain}
            setfetchAgain= {setfetchAgain}
            />
          )}
        </Text>
        </>
    ): (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="2xl" pb={3} fontFamily="sans-serif">Click on a user to start</Text>
        </Box>
    )}
  </>
  )
}
export default SingleChats