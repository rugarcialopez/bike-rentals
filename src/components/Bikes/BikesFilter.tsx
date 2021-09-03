import React from "react";
import { Heading, HStack, VStack, Select } from "@chakra-ui/react"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { fetchBikes } from "../../store/bikes-slice";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

const BikesFilter = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const colorRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const modelRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const weightRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const rateRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const queryParams = new URLSearchParams(location.search);
  let color = '';
  let model = '';
  let weight = '';
  let rate = '';
  if (queryParams.get('color')) {
    color = queryParams.get('color') as string;
  }
  if (queryParams.get('brand')) {
    model = queryParams.get('brand') as string;
  }
  if (queryParams.get('weight')) {
    weight = queryParams.get('weight') as string;
  }
  if (queryParams.get('rate')) {
    rate = queryParams.get('rate') as string;
  }

  useEffect(() => {
    if (color || model || weight || rate) {
      colorRef.current.value = color;
      modelRef.current.value = model;
      weightRef.current.value = weight;
      rateRef.current.value = rate;
      let searchParams = {};
      searchParams = colorRef.current.value ? {...searchParams, color: colorRef.current.value } : searchParams;
      searchParams = modelRef.current.value ? {...searchParams, brand: modelRef.current.value } : searchParams;
      searchParams = weightRef.current.value ? {...searchParams, weight: weightRef.current.value } : searchParams;
      searchParams = rateRef.current.value ? {...searchParams, rate: rateRef.current.value } : searchParams;
      dispatch(fetchBikes(authContext.token, searchParams));
    } else {
      dispatch(fetchBikes(authContext.token));
    }
  }, [color, model, weight, rate, dispatch, authContext.token]);

  const filterByHandler = () => {
    let searchParams = {};
    searchParams = colorRef.current.value ? {...searchParams, color: colorRef.current.value } : searchParams;
    searchParams = modelRef.current.value ? {...searchParams, brand: modelRef.current.value } : searchParams;
    searchParams = weightRef.current.value ? {...searchParams, weight: weightRef.current.value } : searchParams;
    searchParams = rateRef.current.value ? {...searchParams, rate: rateRef.current.value } : searchParams;
    history.push({
      pathname: location.pathname,
      search: '?' + new URLSearchParams(searchParams).toString()
    });
  }

  return (
    <VStack
      p={4}
      w='100vw'
      maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '40vw'}}
      borderWidth='2px'
      boxShadow={'1xl'}
      rounded={'lg'}>
      <Heading 
          mb='4'
          fontWeight='extrabold'
          size='md'
        >
          Filter by
      </Heading>
      <HStack spacing="20px">
        <Select placeholder="Color" ref={colorRef} onChange={filterByHandler}>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
        </Select>
        <Select placeholder="Model" ref={modelRef} onChange={filterByHandler}>
          <option value="Specialized">Specialized</option>
          <option value="Giant">Giant</option>
          <option value="MMR">MMR</option>
          <option value="Cannondale">Cannondale</option>
        </Select>
        <Select placeholder="Weight" ref={weightRef} onChange={filterByHandler}>
          <option value={10}>10 kg</option>
          <option value={11}>11 kg</option>
          <option value={12}>12 kg</option>
          <option value={13}>13 kg</option>
          <option value={14}>14 kg</option>
          <option value={15}>15 kg</option>
        </Select>
        <Select placeholder="Rate" ref={rateRef} onChange={filterByHandler}>
          <option value={1} defaultChecked>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
          <option value={4}>4 stars</option>
          <option value={5}>5 stars</option>
        </Select>
      </HStack>
    </VStack>
  )

}

export default BikesFilter;