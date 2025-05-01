// mockBoardingHouses.ts
const mockBoardingHouses = [
  {
    id: 1,
    owner_id: 101,
    name: "Sunset Haven",
    address: "123 Palm Street, Sunshine City",
    description: "A peaceful and cozy place near the university with full amenities.",
    price: 4500.00,
    ameneties: [
      "Heater",
      "Water",
      "Laundry",
      "WiFi",
      "Aircon"
    ],
    availability_status: true,
    location: {
      latitude: 11.005282,
      longitude: 124.608986,
      region: "NCR",
      barangay: "Barangay 123"
    },
    properties: {
      floorArea: "20 sqm",
      roomType: "Single",
      bathrooms: 1,
      kitchen: true,
      furnished: true
    },
    thumbnail: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      img: require("../assets/housesSample/1.jpg"),
      alt: "Front view of Sunset Haven"
    },
    images: [
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/housesSample/1.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/housesSample/2.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/housesSample/3.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/housesSample/4.jpg")
      },
    ]
  },
  {
    id: 2,
    owner_id: 102,
    name: "Urban Nest",
    address: "456 Mango Avenue, City Central",
    description: "A peaceful and cozy boarding house located just minutes from the university, perfect for students seeking comfort and convenience. Each room is thoughtfully designed to offer a quiet and restful atmosphere for study and relaxation. The property includes full amenities such as high-speed Wi-Fi, a shared kitchen, laundry facilities, and secure access. Ideal for those who value both privacy and a supportive living environment.",
    price: 5200.50,
    ameneties: ["WiFi", "Gym", "Access", "Parking", "Kitchen"],
    availability_status: false,
    location: {
      latitude: 11.009942,
      longitude: 124.597889,
      region: "Metro Manila",
      barangay: "Barangay 456"
    },
    properties: {
      floorArea: "25 sqm",
      roomType: "Studio",
      bathrooms: 1,
      kitchen: true,
      furnished: false
    },
    thumbnail: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      img: require("../assets/housesSample/3.jpg"),
      alt: "Urban Nest studio view"
    },
    images: [
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/23.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/76.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/12.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/13.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/89.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/90.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/91.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/92.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/93.jpg")
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        img: require("../assets/img_resources/94.jpg")
      },
    ]
  }
];

export default mockBoardingHouses;
