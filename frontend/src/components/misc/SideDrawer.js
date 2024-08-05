import React, { useState } from 'react';
import {
  Badge,
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Tooltip,
  DrawerBody,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import Profile from "./Profile";
import axios from 'axios';
import { getSender } from '../../config/ChatLogic';

function SideDrawer() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats, notifications, setnotifications } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();

  const Logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something valid in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Failed to load the results",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chats", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error finding the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };

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
        <Tooltip label='Search chats from here' placement='bottom-end' hasArrow>
          <Button variant='ghost' onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: 'none', md: "flex" }} px='4'>Search User</Text>
          </Button>
        </Tooltip>
        <Text fontSize='2xl' fontFamily='cursive'>TALk-a-tive</Text>
        <div>
          <Menu>
            <Box position="relative" display="inline-block" mx={3}>
              <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1} />
                {notifications.length > 0 && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(50%, -50%)"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </MenuButton>
            </Box>
            <MenuList pl={2}>
              {!notifications.length && "No New Messages"}
              {notifications.map((not) => (
                <MenuItem key={not._id}
                  onClick={() => {
                    setSelectedChat(not.chat);
                    setnotifications(notifications.filter((n) => n !== not));
                  }}
                >
                  {not.chat.isGroupChat 
                    ? `New Message In ${not.chat.chatName}` 
                    : `New message from ${getSender(user, not.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar fontSize="xx-small" cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb="2px">
              <Input placeholder='search name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map(user => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
