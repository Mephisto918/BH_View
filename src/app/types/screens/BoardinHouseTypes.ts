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
    region?: string
    barangay?: string
  },
  properties: {
    floorArea: string
    roomType: string
    bathrooms: string 
    kitchen: string
    furnished: string
  },
  // thumbnail: {
  //   img: string 
  //   alt: string
  // },
  thumbnail: [] | { img: string; alt?: string };
  images: Array<string | undefined>
}

export default BoardingHouseTypesProps