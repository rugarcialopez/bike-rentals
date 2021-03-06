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
  availableForRenting: boolean,
  averageRate: number,
  numberOfRates: number
}

export default Bike;