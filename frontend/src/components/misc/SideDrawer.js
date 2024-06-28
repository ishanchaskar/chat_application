import { Avatar, Box, Button, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import React , {useState} from 'react'
import { Tooltip } from '@chakra-ui/react'
import {
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider"; 
import Profile from "./Profile";
function SideDrawer() {
    const[Search , setSearch] = useState()
    const[searchResult , setSearchResult] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[Loading , setLoading] = useState(false)
    const[loadingChat , setLoadingChat] = useState()
    const { user } = ChatState();
    const navigate = useNavigate()

    const Logout =() =>{
      localStorage.removeItem('userInfo');
      navigate('/')
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
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer