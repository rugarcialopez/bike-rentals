type Bike = {
  id: string,
  brand: string;
  colors: string[],
  weight: number,
  location: {
    longitude: number,
    latitude: number
  }
  photo: string,
  availableForRenting: boolean
}

export default Bike;