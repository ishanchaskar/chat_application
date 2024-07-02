import { Button, useDisclosure, useToast } from '@chakra-ui/react';
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
  import { ChatState } from '../../Context/ChatProvider';
const GroupChat = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [GroupChatName, setGroupChatName] = useState();
    const [search, setsearch] = useState();
    const [selectedUser, setselectedUser] = useState([]);
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);
    const toast = useToast();
    const { user , children} = ChatState();
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            sdkjhfb
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChat