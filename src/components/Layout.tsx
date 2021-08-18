import { Flex } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";


const Layout: React.FC = (props) => {
  return (
    <Flex direction='column' align='center' justify='center'>
      <NavBar />
      <Flex justify='center' align='center' w='100%' h='93vh'>
        {props.children}
      </Flex>
    </Flex>
  )
};

export default Layout;