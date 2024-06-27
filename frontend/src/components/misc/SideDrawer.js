import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React , {useState} from 'react'
import { Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider"; 
import Profile from "./Profile";
function SideDrawer() {
    const[Search , setSearch] = useState()
    const[searchResult , setSearchResult] = useState([])
    const[Loading , setLoading] = useState(false)
    const[loadingChat , setLoadingChat] = useState()
    const { user } = ChatState();
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
    <Button variant='ghost'>
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
      <MenuItem>Logout </MenuItem>
    </MenuList>
  </Menu>
</div>
    </Box>
    </>
  )
}

export default SideDrawer