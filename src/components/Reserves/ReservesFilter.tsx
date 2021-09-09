import React from "react";
import { Heading, HStack, VStack, Select } from "@chakra-ui/react"
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../store";
import Reserve from "../../models/Reserve";
import { useState } from "react";

type Users = {
  [key: string] : Reserve[]
}

type Bikes = {
  [key: string] : Reserve[]
}

type ObjectKey = string | number | symbol

const groupBy = <
  K extends ObjectKey,
  TItem extends Record<K, ObjectKey>
>(
  items: TItem[],
  key: K
): Record<ObjectKey, TItem[]> =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {} as Record<ObjectKey, TItem[]>
  )


const ReservesFilter = () => {
  const [users, setUsers] = useState<Users>({});
  const [bikes, setBikes] = useState<Bikes>({});
  const history = useHistory();
  const location = useLocation();
  const reserves = useSelector((state: RootState) => state.reserves.list);

  const userRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const bikeRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const queryParams = new URLSearchParams(location.search);
  let user = queryParams.get('user') ? queryParams.get('user'): '';
  let bike = queryParams.get('bike') ? queryParams.get('bike') : '';

  useEffect(() => {
    setUsers(groupBy(reserves, 'userId'));
    setBikes(groupBy(reserves, 'bikeId'));
  }, [reserves])

  useEffect(() => {
    if (user && Object.keys(users).length !== 0) {
      userRef.current.value = user;
    }
    if (bike && Object.keys(bikes).length !== 0) {
      bikeRef.current.value = bike;
    }
  }, [user, bike, bikes, users]);

  const filterHandler = () => {
    let searchParams = {};
    searchParams = userRef.current.value ? {...searchParams, user: userRef.current.value } : searchParams;
    searchParams = bikeRef.current.value ? {...searchParams, bike: bikeRef.current.value } : searchParams;
    history.push({
      pathname: location.pathname,
      search: '?' + new URLSearchParams(searchParams).toString()
    });
  }

  return (
    <VStack
      p={4}
      w='100vw'
      maxW={{base: '90vw', sm: '80vw' , lg: '50vw', xl: '30vw'}}
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
        <Select placeholder="User" ref={userRef} onChange={filterHandler}>
          {
            Object.keys(users || {}).map(key => <option key={key} value={key}>{users ? users[key][0].fullName : ''}</option>)
          }
        </Select>
        <Select placeholder="Model" ref={bikeRef} onChange={filterHandler}>
          { Object.keys(bikes || {}).map(key => <option key={key} value={key}>{bikes ? bikes[key][0].brand : ''}</option>) }
        </Select>
      </HStack>
    </VStack>
  )

}

export default React.memo(ReservesFilter);