type Bike = {
  id: string,
  brand: string;
  colors: string[],
  weight: number,
  location: {
    longitude: string
    latitude: string
  }
  photo: string,
  availableForRenting: boolean
}

export default Bike;