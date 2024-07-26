import { Box, Button, FormControl, IconButton, Input, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {ChatState} from "../../Context/ChatProvider";
import { ViewIcon } from '@chakra-ui/icons'
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
const UpdateGroupChatModal = () => {
    const { user, setSelectedChat, selectedChat } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setgroupChatName] = useState();
    const [search, setsearch] = useState("")
    const [searchResult, setsearchResult] = useState([])
    const [loading, setloading] = useState(false)
    const [renameLoading, setrenameLoading] = useState(false)
    const toast = useToast();
    const handleRename =async () => {
      if(!groupChatName ) return
      try {
        setrenameLoading(true)
        const config = {
          headers: {
            Authorization : `Bearer ${user.token}`
          },
        }
        const {data} = await axios.put("http://localhost:5000/api/chats/rename" , {chatId : selectedChat._id , chatName : groupChatName } , config);
      } catch (error) {
        
      }
    };
    const handleSearch = () => {};
    
    const handleRemove = () => {};
  return (
  <>
    <IconButton d={{base : "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader 
    fontSize="36px"
    // display="flex"
    fontFamily="Roboto"
    textAlign="center">{selectedChat.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Box 
        w="100%" 
        display="flex"
        flexWrap="wrap"
        pb={3}
        >
        {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
        </Box>
        <FormControl display="flex">
            <Input 
            placeholder="Chat Name"
            value={groupChatName}
            mb={3}
            onChange={(e) => setgroupChatName(e.target.value)}
            />
            <Button
            variant="solid"
            colorSchema="teal"
            ml={3}
            isLoading={renameLoading}
            onClick={handleRename}
            >
                Update
            </Button>
</FormControl>
<FormControl>
<Input 
            placeholder="Add user to group"
            
            mb={1}
            onChange={(e) => handleSearch(e.target.value)}
            />
</FormControl>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red'  onClick={() => handleRemove(user)}>
        Leave Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  </>
  )
}
export default UpdateGroupChatModal