import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user , handleFunction}) => {
  return (
    <>
    <Box px={2} py={1} borderRadius="lg" color="white" m={1} mb={2} fontSize={12} colorscheme="purple" cursor="pointer" bg="purple" onClick={handleFunction}>
      {user.name}
      <CloseIcon/>
    </Box>
    </>
  )
}

export default UserBadgeItem