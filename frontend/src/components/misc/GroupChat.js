import {
  Box,
  Button,
  FormControl,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UserListItem from "../../components/UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserBadgeItem from "../../components/UserAvatar/UserBadgeItem";

const GroupChat = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = async (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error("Error occurred during search:", error);
      toast({
        title: "Error occurred",
        description: "Failed to load search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  

  const handleSubmit = async () => {
    if (!selectedUser.length || !groupChatName) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chats/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUser.map((u) => u._id)),
      }, config);
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New group chat created",
        duration: 2000,
        isClosable: true,
        status: "success",
        position: "bottom",
      });
    } catch (error) {
      console.error("Group chat creation error:", error);
      toast({
        title: "Group creation failed",
        description: error.response?.data?.message || "An error occurred",
        duration: 2000,
        position: "bottom",
        status: "error",
      });
    }
  };
  

  const handleDelete = (deletedUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== deletedUser._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="monospace"
            fontSize="35px"
            justifyContent="center"
            display="flex"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Enter your chat name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Enter member name"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" flexWrap="wrap">
              {selectedUser.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChat;
