import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const BikesList = () => {
  const bikes = [
    {
      id: 1,
      model: 'MMR',
      color: 'green',
      weight: '12kg'
    },
    {
      id: 2,
      model: 'Specialized',
      color: 'yellow',
      weight: '10kg'
    },
    {
      id: 3,
      model: 'Cannondale',
      color: 'black',
      weight: '15kg'
    }
  ]
  return (
    <VStack
      divider={<StackDivider/>}
      borderColor='gray.100'
      borderWidth='2px'
      p='4'
      borderRadius='lg'
      width='100%'
      maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
      alignItems='strecht'
    >
      { bikes.map(bike => (
        <HStack key={bike.id}>
          <Text>{bike.model}</Text>
          <Spacer />
          <IconButton aria-label='Delete icon' icon={<DeleteIcon/>} isRound/>
        </HStack>
      ))}
    </VStack>
  )
}

export default BikesList;