import { FormControl } from "@chakra-ui/form-control";
import { Stack } from "@chakra-ui/layout";
import {
  Select,
  Box,
  Button,
  Input,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";
import AuthContext from "../../store/auth-context";
import { addBike, updateBike } from "../../store/bikes-slice";

type FormValues = {
  brand: string,
  weight: string,
  location: string,
  file: FileList,
  availableForRenting: boolean,
  colors: string[]
}

type BikeFormProps = {
  editMode: boolean
}
    
type BikeFormHandle = {
  setValues: (brand: string, color: string[], weight: string, location: string, availableForRenting: boolean) => void,
}

const BikeForm = React.forwardRef((props: BikeFormProps, ref: React.Ref<BikeFormHandle>) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { id } = useParams<{ id: string }>()
  const name = useSelector((state: RootState) => state.bikes.name);
  const status = useSelector((state: RootState) => state.bikes.status);
  const error = useSelector((state: RootState) => state.bikes.error);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (['ADD', 'UPDATE'].includes(name) && status === 'completed' && error === '') {
      history.push('/bikes');
    }
  }, [ history, status, error, name ]);

  const setValues = (brand: string, colors: string[], weight: string, location: string, availableForRenting: boolean) => {
    setValue('brand', brand);
    setValue('weight', weight);
    setValue('location', location);
    setValue('availableForRenting', availableForRenting);
    setValue('colors', colors);
  }

  useImperativeHandle(ref, () => {
    return {
      setValues: setValues
    }
  })

  const onSubmit = handleSubmit(async (data) =>  {
    const coordinates = data.location.split(',');
    const longitude = coordinates[0];
    const latitude = coordinates[1];
    const formData = new FormData();
    formData.append('brand', data.brand);
    formData.append('color', data.colors.join());
    formData.append('weight', data.weight);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('availableForRenting', data.availableForRenting.toString());
    formData.append('file', data.file[0]);
    if (props.editMode) {
      dispatch(updateBike(authContext.token, id, formData));
    } else {
      dispatch(addBike(authContext.token, formData));
    }
  });

  const validateFiles = (value: FileList) => {
    if (!value || value.length === 0) {
      return 'Files is required'
    }
    const fsMb = value[0].size / (1024 * 1024)
    const MAX_FILE_SIZE = 10 //Max file size 10mb
    if (fsMb > MAX_FILE_SIZE) {
      return 'Max file size 10mb'
    }
    return true
  }

  const validateLocation = (value: string) => {
    if (!value || value === '') {
      return 'Please add a location';
    }
    if (value.split(',').length !== 2) {
      return 'Incorrect format. Please enter a correct format';
    }
    if (isNaN(+value.split(',')[0])) {
      return 'Incorrect longitude';
    }
    if (isNaN(+value.split(',')[1])) {
      return 'Incorrect latitude';
    }
    return true;
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Stack
          bg='gray.200'
          spacing={3}
          borderColor='gray.100'
          borderWidth='2px'
          borderRadius='lg'
          p={6}
          w='100vw'
          maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
          boxShadow='sm'
          rounded='lg'
        >
          <FormControl isInvalid={!!errors.brand}>
            <FormLabel>Model</FormLabel>
            <Select  {...register('brand', { required:  true })} placeholder="Please select a model" bg='white' data-testid="select-bike-model">
              <option value="specialized">Specialized</option>
              <option value="giant">Giant</option>
              <option value="mmr">MMR</option>
              <option value="cannondale">Cannondale</option>
            </Select>
            { errors.brand && <FormErrorMessage>Please select a model </FormErrorMessage> }    
          </FormControl>
          <FormControl isInvalid={!!errors.colors}>
            <FormLabel>Color</FormLabel>
              <HStack alignItems="flex-start" spacing={10} bg='white' p={2}>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='green'/> Green</Box>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='orange'/> Orange</Box>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='black'/> Black</Box>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='white'/> White</Box>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='yellow'/> Yellow</Box>
                <Box><input type={'checkbox'} {...register('colors', { required: true })} value='blue'/> Blue</Box>
              </HStack>
              { errors.colors && <FormErrorMessage> Please select a color </FormErrorMessage> }
          </FormControl>
          <FormControl isInvalid={!!errors.weight}>
            <FormLabel>Weight</FormLabel>
            <Select {...register('weight', { required:  true })} placeholder="Please select a weight" bg='white' data-testid="select-bike-weight">
                <option value={10}>10 kg</option>
                <option value={11}>11 kg</option>
                <option value={12}>12 kg</option>
                <option value={13}>13 kg</option>
                <option value={14}>14 kg</option>
                <option value={15}>15 kg</option>
            </Select>
            { errors.weight && <FormErrorMessage> Please select a weight </FormErrorMessage> }            
          </FormControl>
          <FormControl isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input
                  {...register('location', { validate: validateLocation })}
                  type="text"
                  placeholder="Please introduce the longitude and latitude"
                  aria-label="Location"
                  bg='white'
                />
              <FormHelperText>Format:longitude,latitude</FormHelperText>
              { errors.location && errors.location.message && <FormErrorMessage>{errors.location.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.file}>
            <FormLabel>Photo</FormLabel>
            <input
              type={'file'}
              multiple={false}
              accept={'image/*'}
              {...register('file', { validate: validateFiles })}
            />
            <FormErrorMessage>
            { errors.file && errors.file.message && <FormErrorMessage>{errors.file.message}</FormErrorMessage>}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <HStack alignItems="flex-start" spacing={10} bg='white' p={2}>
              <Box><input type={'checkbox'} {...register('availableForRenting')}/> Available for renting</Box>
            </HStack>
          </FormControl>
          
          <Box textAlign="center">
            <Button
              type='submit'
              boxShadow='sm'
              _hover={{ boxShadow: 'md' }}
              _active={{ boxShadow: 'lg' }}>
                { props.editMode ? 'Update' : 'Add' }
            </Button>
          </Box>
        </Stack>
      </form>
    </Fragment>
  );
});

export default BikeForm;