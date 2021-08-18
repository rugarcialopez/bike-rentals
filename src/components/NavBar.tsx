import React from "react";

import {
	Flex,
	Stack,
	useColorMode,
	Box,
	Image,
  IconButton
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../logo.svg";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const NavBar: React.FC = props => {
	const { colorMode, toggleColorMode } = useColorMode();
	const bgColor = { light: 'gray.300', dark: 'gray.600' };
	const textColor = { light: 'black', dark: 'gray.100' };
	const authContext = useContext(AuthContext);
  const location = useLocation();
	
	return (
		<Flex
			w='100vw'
			bg={bgColor[colorMode]}
			align='center'
			color={textColor[colorMode]}
			justify='center'
			alignItems='center'
			fontSize={['md', 'lg', 'xl', 'xl']}
			h='7vh'
			boxShadow='md'
			p={2}>
			<Flex w={['100vw', '100vw', '80vw', '80vw']} justify='space-around'>
				<Box>
					<Image h='4vh' src={logo} alt='Logo of Bike rentals' />
				</Box>
				<Stack
					spacing={8}
					color={textColor[colorMode]}
					justify='center'
					align='center'
					isInline>
					{
						!authContext.isLoggedIn && 
						<Box
							position='relative'
							opacity={location.pathname !== '/' ? 0.4 : 1}>
							<Link to='/'>
								Home
							</Link>
						</Box>
					}
					{
						!authContext.isLoggedIn && 
						<Box
							position='relative'
							opacity={location.pathname !== '/login' ? 0.4 : 1}>
							<Link to='/login'>
								Login
							</Link>
						</Box>
					}
					{
						authContext.isLoggedIn &&
						<Box
							position='relative'
							opacity={location.pathname !== '/bikes' ? 0.4 : 1}>
							<Link to='/bikes'>
								Bikes
							</Link>
						</Box>
					}
				</Stack>
				<Box>
					<IconButton
						rounded='full'
            aria-label="Color Mode"
						onClick={toggleColorMode}
						icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}>
						Change Color Mode
					</IconButton>
				</Box>
			</Flex>
		</Flex>
	);
};

export default NavBar;