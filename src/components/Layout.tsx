import { Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout: React.FC = (props) => {
  const location = useLocation();
  return (
    <Flex direction='column' align='center' justify='center'>
      <NavBar />
      <Flex justify='center' align='center' w='100%' h={location.pathname !== '/bikes' && location.pathname !== '/users' ? '93vh' : ''}>
        {props.children}
      </Flex>
    </Flex>
  )
};

export default Layout;