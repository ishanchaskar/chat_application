import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom"
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import axios from 'axios';
const Signup =  () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [pic, setpic] = useState('');
  const [show, setshow] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setshow(!show);
  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select an image',
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "dcbtqsfki");
      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dcbtqsfki/image/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        setpic(result.url.toString());
        console.log(result.url.toString());
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast({
          title: "Error uploading image",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !pic){
      toast({
        title: "error please fill all the details",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false);
      return;
    }
    if( password !== confirmpassword){
      toast({
        title: "Please fill the correct password",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      }) 
      return
    }

    try {
      const config = 
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const {data} = await axios.post("api/user" , {name , password , email , pic} , config)
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      }) 
      localStorage.setItem("userInfo" , JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error occured",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        description: error.response.data.message
      }) 
      setLoading(false)
    }
  };

  return (
    <VStack spacing="1px">
      <FormControl id="first-name" isRequired>
        <FormLabel>
          Name
          <Input
            placeholder='Enter your name'
            onChange={(e) => setname(e.target.value)}
          />
        </FormLabel>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>
          Email
          <Input
            placeholder='Enter your email'
            onChange={(e) => setemail(e.target.value)}
          />
        </FormLabel>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>
          Password
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={(e) => setpassword(e.target.value)}
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
        <FormLabel>
          Confirm Password
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={(e) => setconfirmpassword(e.target.value)}
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
        <FormLabel>
          Picture
          <Input
            type='file'
            p={1.5}
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormLabel>
      </FormControl>
      
      <Button colorscheme='blue'
        width="100%"
        marginTop={15}
        onClick={submitHandler}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
