import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BikeForm from "../components/Bikes/BikeForm";
import Bike from "../models/Bike";
import { RootState } from "../store";

const EditBikePage = () => {
  const bikes = useSelector((state: RootState) => state.bikes.list);
  type BikeFormHandle = React.ElementRef<typeof BikeForm>;
  const bikeFormRef = useRef() as React.MutableRefObject<BikeFormHandle>;
  const { id } = useParams< { id: string }>();

  useEffect(() => {
    if (id && bikes.length > 0) {
      const  bike = bikes.find((bike: Bike) => bike.id === id);
      if (bike) {
        const location = `${bike.location.latitude.toString()},${bike.location.longitude.toString()}`
        bikeFormRef.current.setValues(bike.brand, bike.colors, bike.weight.toString(), location, bike.availableForRenting);
      }
    }
  }, [ id, bikes ]);

  return (
    <VStack p={4} w='100vw'>
      <Heading 
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, gray.700, gray.500, gray.300)'
        bgClip='text'
      >
        Edit bike
      </Heading>
        <BikeForm ref={ bikeFormRef } editMode={true}/>
    </VStack>
  )
}

export default EditBikePage;