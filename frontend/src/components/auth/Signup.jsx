import React, { useState } from 'react'
import { Button, ButtonGroup, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [show, setshow] = useState(false);

  const handleClick = () => setshow(!show);
  const submitHandler = () => {}
  const postDetails = () => {}
  return (
  
    
    <VStack spacing="1px">
      <FormControl id="first-name" isRequired>
        <FormLabel> Name
          <Input
          placeholder='enter your name'
          onChange={(e)=> setname(e.target.value)}
          />
        </FormLabel>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel> Email
          <Input
          placeholder='enter your email'
          onChange={(e)=> setemail(e.target.value)}
          />
        </FormLabel>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password
          <InputGroup>
          <Input
          type= {show ? 'text' : 'password'}
          placeholder='enter your password'
          onChange={(e)=> setpassword(e.target.value)}
          />
          <InputRightElement>
          <Button h="1.75rem" marginLeft="-2rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
          </InputRightElement>
          </InputGroup>
        </FormLabel>
      </FormControl>

      <FormControl id="conpassword" isRequired>
        <FormLabel> Confirm Password
          <InputGroup>
          <Input
          type= {show ? 'text' : 'password'}
          placeholder='enter your password'
          onChange={(e)=> setconfirmpassword(e.target.value)}
          />
          <InputRightElement>
          <Button h="1.75rem" marginLeft="-2rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
          </InputRightElement>
          </InputGroup>
        </FormLabel>
      </FormControl>
      
      <FormControl id="pic" isRequired>
        <FormLabel> Picture
          <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e)=> postDetails(e.target.files[0])}
          />
        </FormLabel>
      </FormControl>
<Button colorScheme='blue' 
width="100%"
marginTop={15}
onClick={submitHandler}

>
Signup
</Button>


    </VStack>
  )
}

export default Signup