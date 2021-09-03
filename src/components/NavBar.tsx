import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import React from 'react';
import logo from "../logo.svg";
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    history.push('/login');
  }

  const logoutHandler = () => {
    authContext.logout();
    history.push('/');
  }

  return (
    <Box>
      <Flex
        w='100vw'
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        {
          authContext.isLoggedIn &&
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
        }
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <Image h='4vh' src={logo} alt='Logo of Bike rentals' />
          </Text>
          
          {
            authContext.isLoggedIn &&
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav role={authContext.role}/>
            </Flex>
          }
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          { 
            !authContext.isLoggedIn &&
            <Button
              onClick={loginHandler}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}>
              Login
            </Button>
          }
          {
            authContext.isLoggedIn &&
            <Button
              onClick={logoutHandler}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}>
              Logout
            </Button>
          }
        </Stack>
      </Flex>

      {
        authContext.isLoggedIn &&
        <Collapse in={isOpen} animateOpacity>
          <MobileNav role={authContext.role}/>
        </Collapse>
      }
    </Box>
  );
}

const DesktopNav: React.FC<{role: string}> = (props) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        const { roles } = navItem;
        const { role } = props;
        if (roles.includes(role)) {
          return <Box key={navItem.label}>
                  <Popover trigger={'hover'} placement={'bottom-start'}>
                    <PopoverTrigger>
                      <Link
                        p={2}
                        as={ReactLink}
                        to={navItem.to}
                        fontSize={'sm'}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                        }}>
                        {navItem.label}
                      </Link>
                    </PopoverTrigger>
                  </Popover>
                </Box>
        } else {
          return null;
        }
      })}
    </Stack>
  );
};

const MobileNav: React.FC<{ role: string }> = (props) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem: NavItem) => {
        if (navItem.roles.includes(props.role)) {
          return  <MobileNavItem key={navItem.label} {...navItem} /> 
        } else {
          return null;
        }
      })}
    </Stack>
  );
};

const MobileNavItem = ({ label, to }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={ReactLink}
        to={to}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

interface NavItem {
  label: string;
  to: string;
  roles: string[];
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Users',
    to: '/users',
    roles: ['manager']
  },
  {
    label: 'Bikes',
    to: '/bikes',
    roles: ['manager', 'user']
  },
  {
    label: 'My reserves',
    to: '/reserves',
    roles: ['user']
  }
];