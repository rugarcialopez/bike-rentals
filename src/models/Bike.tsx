type Bike = {
  id: string,
  brand: string;
  colors: string[],
  weight: number,
  location: {
    latitude: string,
    longitude: string
  }
  photo: string,
  availableForRenting: boolean
}

export default Bike;