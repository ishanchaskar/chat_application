import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {Cloudinary} from "@cloudinary/url-gen";

// const App = () => {
  
// };
import { Button, ButtonGroup, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [show, setshow] = useState(false);
  const toast = useToast()
  const [loading , setLoading] = useState(false);
  const handleClick = () => setshow(!show);
  const submitHandler = () => {}

  const cloudinary = new Cloudinary({
    cloud_name: 'dcbtqsfki', // Replace with your actual Cloud Name
    api_key: '583983898796181', // Replace with your actual API Key
    api_secret: '50ZvOaVTas_JwDSg_3AuN-yvADo', // Replace with your actual API Secret
  });


  const postDetails = async (pics) => {
    setLoading(true);
    if(pics === undefined){
      toast({
        title: 'Please select an image',
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return 
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file" , pics)
      data.append("upload_preset" , "chat_app")
      data.append("cloud_name" , "dcbtqsfki")
      fetch("cloudinary://583983898796181:50ZvOaVTas_JwDSg_3AuN-yvADo@dcbtqsfki" ,{
        method: "POST",
        body: data
      }).then(res => res.json())
      .then(data =>{
        setpic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      })
      .catch(err =>{
        console.log(err)
        setLoading(false);
      })
    }else{
      toast({
        title:"please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }
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
isLoading={loading}
>
Signup
</Button>


    </VStack>
  )
}

export default Signup