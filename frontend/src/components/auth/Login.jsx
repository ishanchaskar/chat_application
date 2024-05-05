import React, { useState } from 'react'
import { Button, ButtonGroup, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
function Login() {
  const [password, setpassword] = useState();
  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const handleClick = () => setshow(!show);
  const submitHandler = () => {}
  const postDetails = () => {}
  return (
    <VStack spacing="1px">
 

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

      

<Button colorScheme='blue' 
width="100%"
marginTop={15}
onClick={submitHandler}

>
Login
</Button>
<Button
  colorScheme='red'
  variant="solid" 
  width="100%"
  marginTop={15}
  onClick={() => {
    setemail("guest@gmail.com");
    setpassword("guest");
    submitHandler(); // Invoke submitHandler after setting email and password
  }}
>
  Guest Credentials
</Button>


    </VStack>
  )
}

export default Login