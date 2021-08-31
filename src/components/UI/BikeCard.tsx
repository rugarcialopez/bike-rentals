import React from 'react';
import {
  Heading,
  Text,
  Stack,
  Button,
  Badge,
  Box,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Bike from '../../models/Bike';
import GoogleMaps from './Map';

const BikeCard: React.FC<{bike: Bike, onRemove: (id: string) => void}>= (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  return (
    <Box
        width='100%'
        borderWidth='2px'
        boxShadow={'1xl'}
        rounded={'lg'}
        p={6}
        maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '30vw'}}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={props.bike.photo}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.bike.brand}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {props.bike.weight} kg
        </Text>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {props.bike.availableForRenting? 'Available' : 'Not available'}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {props.bike.colors.map((color, index) => 
            <Badge
            key={index}
            px={2}
            py={1}
            fontWeight={'400'}>
            #{color}
          </Badge>
          )}
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
        <Button
            onClick={onOpen}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            View map
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <GoogleMaps longitude={props.bike.location.longitude} latitude={props.bike.location.latitude}/>
              </ModalBody>
            </ModalContent>
           </Modal>
          <Button
            onClick={() => history.push(`/bikes/${props.bike.id}`)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Edit
          </Button>
          <Button
            onClick={props.onRemove.bind(null, props.bike.id)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Remove
          </Button>
        </Stack>
      </Box>      
  );
}

export default BikeCard;