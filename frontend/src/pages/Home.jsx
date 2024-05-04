import React from 'react';
import '../App.css';
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

const Home = () => {
  return (
    <div className='App'>
    <Container  maxW='xl' centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="xxx-large" fontFamily="Work Sans" color="black" textAlign="center" lineHeight="40px">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <Login/> */}
            </TabPanel>
            <TabPanel>
              {/* <Signup/> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </div>
  );
};

export default Home;
