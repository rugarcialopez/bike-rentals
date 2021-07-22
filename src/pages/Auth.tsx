import { Tabs,  TabList, Tab, TabPanels, TabPanel} from "@chakra-ui/react";
import React from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";

const Auth = () => {
  return (
    <Tabs variant='enclosed-colored' isFitted m={4}>
      <TabList>
        <Tab>Sign Up</Tab>
        <Tab>Login</Tab>
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
  )
}

export default Auth;