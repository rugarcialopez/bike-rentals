import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AddUser = () => {
  const history = useHistory();
  return (
    <Box>
      <Button 
        boxShadow='sm'
        _hover={{ boxShadow: 'md' }}
        _active={{ boxShadow: 'lg' }}
        px='8'
        type='button'
        mt={4}
        onClick={() => history.push('/add-user')}>Add user</Button>
    </Box>
  )
}

export default AddUser;