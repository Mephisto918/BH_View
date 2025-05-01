interface BoardingHouseTypesProps {
  id: number,
  owner_id: number,
  name: string,
  address: string,
  description: string,
  price: number,
  ameneties: Array<string>,
  availability_status: boolean,
  location: {
    latitude: number,
    longitude: number,
    region: string
    barangay: string
  },
  properties: {
    floorArea: string
    roomType: string
    bathrooms: number 
    kitchen: boolean
    furnished: boolean 
  },
  thumbnail: {
    img: string 
    alt: string
  },
  images: Array<{img: string}>
}

export default BoardingHouseTypesProps