import React from 'react';
import {
  Heading,
  Text,
  Stack,
  Button,
  Box,
  Avatar,
} from '@chakra-ui/react';
import Reserve from '../../models/Reserve';

const ReserveCard: React.FC<{reserve: Reserve, onCancelReservation: (id: string) => void}>= (props) => {
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
          src={props.reserve.photo}
          alt={'bike Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {props.reserve.brand}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          Reserved date: {props.reserve.date}
        </Text>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Rate
          </Button>
          <Button
            onClick={props.onCancelReservation.bind(null, props.reserve.id)}
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

export default React.memo(ReserveCard);