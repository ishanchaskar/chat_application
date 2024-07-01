import { Avatar, Box, Button, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React , {useState} from 'react'
import { Tooltip } from '@chakra-ui/react'
import {
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
} from '@chakra-ui/react'
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem"
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider"; 
import Profile from "./Profile";
import axios from 'axios'
function SideDrawer() {
    const[search , setsearch] = useState()
    const[searchResult , setSearchResult] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[loading , setLoading] = useState(false)
    const[loadingChat , setLoadingChat] = useState()
    const { user , setSelectedChat , chats, setChats } = ChatState();
    const navigate = useNavigate()

    const Logout =() =>{
      localStorage.removeItem('userInfo');
      navigate('/')
    }
const toast = useToast();
    const handleSearch = async () => {
      if(!search){
        toast({
          title:"Please Enter Something valid in search",
          status: "warning",
          duration : 5000,
          isClosable: true,
          position :"top-left"
        })
      }

      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }
        const {data} = await axios.get(`/api/user?search=${search}` , config)
        setLoading(false)
        setSearchResult(data)
      } catch (error) {
        toast({
          title:"Failed to load the results",
          status: "warning",
          duration : 5000,
          isClosable: true,
          position :"bottom-left"
        })
      }
    }

    const accessChat = async(userId) => {
      try {
        setLoading(true)
        const config = {
          headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${user.token}`
          },
        }
        const {data} = await axios.post("/api/chat" , {userId} , config)

        if(!chats.find((c)=> c._id === data._id ))setChats([data , ...chats])
        setSelectedChat(data)
        setLoading(false)
        onClose();
      } catch (error) {
        toast({
          title:"Error finding the chat",
          description: error.message,
          status: "error",
          duration : 5000,
          isClosable: true,
          position :"bottom-leftt"
        })
      }
    }
  return (
    <>
    <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    bg='white'
    width='100%'
    p='5px 10px 5px 10px'
    borderWidth='5px'
    >
    <Tooltip label='Search chats from here' placeContent='bottom-end' hasArrow>
    <Button variant='ghost' onClick={onOpen}>
      <i class="fa-solid fa-magnifying-glass"></i>
      <Text display={{base: 'none' , md: "flex"}} px='4' >Search User</Text>
    </Button>
  </Tooltip>
<Text fontSize='2xl' fontFamily='cursive'> TALk-a-tive</Text>
<div>
  <Menu>
    <MenuButton p={1}>
    <BellIcon fontSize='2xl' m={1}/>
    </MenuButton>
    {/* <MenuList></MenuList> */}
  </Menu>

  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
    <Avatar fontSize='sm' cursor='pointer' name={user.name} src={user.pic}/>
    </MenuButton>
    <MenuList>
      <Profile user={user}>
      <MenuItem>My Profile </MenuItem>
      </Profile>
      <MenuDivider/>
      <MenuItem onClick={Logout}>Logout </MenuItem>
    </MenuList>
  </Menu>
</div>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <Box display="flex" pb="2px">
          <Input placeholder='search name or email' mr={2} value={search} onChange={(e) => setsearch(e.target.value)}/>
          <Button onClick={handleSearch}>Go</Button>
        </Box>
        {loading ? (
          <ChatLoading/>
        ) : (
          searchResult?.map(user => (
            <UserListItem
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />
          ))
        )
        }
        {loadingChat && <Spinner ml="auto" display="flex"/>}
      </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer