import { Tabs,  TabList, Tab, TabPanels, TabPanel, Box, useColorMode} from "@chakra-ui/react";
import React from "react";

import LoginForm from "../components/Auth/SignInForm";
import SignUpForm from "../components/Auth/SignupForm";

const Auth = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
			bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
			w='350px'
			p={3}
			boxShadow='sm'
			rounded='lg'>
      <Tabs variant='enclosed-colored' isFitted m={4}>
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels mt={3}>
          <TabPanel>
            <SignUpForm />
          </TabPanel>
          <TabPanel>
            <LoginForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Auth;