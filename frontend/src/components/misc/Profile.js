import { Button, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { IconButton} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
const Profile = ({user , children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
    <>
    {children} ? (
        <span onClick={onOpen}>{children}</span>
    ) : (
        <IconButton
        d={{base : "flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
        />
    )
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="40px"
          fontFamily='-moz-initial'
          d="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
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

export default Profile