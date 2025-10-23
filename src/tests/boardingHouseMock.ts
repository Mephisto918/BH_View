import { z } from "zod";
export const ROOM_FEATURE_TAGS = [
  "AirConditioning",
  "PrivateBathroom",
  "SharedBathroom",
  "Balcony",
  "Kitchenette",
  "FullKitchen",
  "TV",
  "WiFi",
  "Wardrobe",
  "Desk",
  "MiniFridge",
  "Microwave",
  "Washer",
  "AccessibleRoom",
  "PetFriendly",
  "SmokeFree",
  "Bathtub",
  "HotShower",
  "LakeView",
  "MountainView",
  "CityView",
  "GardenView",
  "Soundproofing",
  "HighFloor",
  "GroundFloor",
  "PrivateEntrance",
  "KeylessEntry",
  "ServicedCleaning",
  "LaundryService",
  "Closet",
  "Safe",
  "Fan",
  "PetsAllowed",
  "PetsNotAllowed",
] as const;

export const ROOM_TYPES = ["SOLO", "DUO", "TRIO", "SQUAD", "FAMILY"] as const;

export type RoomFeatureTag = (typeof ROOM_FEATURE_TAGS)[number];
export type RoomType = (typeof ROOM_TYPES)[number];

/* ===========================
   INPUT SCHEMA (App → Backend)
   =========================== */

export const ImageUploadSchema = z.object({
  uri: z.string().url().or(z.string()), // local or remote paths
  name: z.string(),

  // Type narrowing for MIME type
  type: z
    .string()
    .transform((t) => t.toLowerCase())
    .refine(
      (t) => ["image/jpeg", "image/jpg", "image/png"].includes(t),
      "Unsupported image type"
    ),

  // Type narrowing for quality
  quality: z
    .string()
    .transform((q) => q.toLowerCase())
    .refine((q) => ["low", "medium", "high"].includes(q), "Invalid quality")
    .optional(),

  // Size validation
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" })
    .optional(),
});

export type AppImageFile = z.infer<typeof ImageUploadSchema>;

export const ImageTypeEnum = z.enum([
  "PFP",
  "THUMBNAIL",
  "MAIN",
  "GALLERY",
  "BANNER",
  "FLOORPLAN",
  "DOCUMENT",
  "QR",
  "MAP",
  "ROOM",
]);
export type ImageType = z.infer<typeof ImageTypeEnum>;

export const ImageQualityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const RoomTypeEnumSchema = z.enum([
  "SOLO",
  "DUO",
  "TRIO",
  "SQUAD",
  "FAMILY",
]);

export const GetRoomSchema = z.object({
  id: z.number(), // response usually includes an ID
  roomNumber: z.string(),
  maxCapacity: z.number(),
  currentCapacity: z.number(),
  price: z.preprocess((val) => Number(val), z.number()),
  gallery: z.array(ImageUploadSchema).optional(),
  thumbnail: z.array(ImageUploadSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
  availabilityStatus: z.boolean(),
  createdAt: z.string(), // ISO date strings if coming from server
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
});

export type GetRoomType = z.infer<typeof GetRoomSchema>;

export const CreateRoomInputSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  maxCapacity: z
    .string()
    .min(1, "Max capacity is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Max capacity must be a positive number",
    }),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
      message: "Price must be a non-negative number",
    }),
  gallery: z.array(ImageUploadSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
});

export const CreateRoomSchema = CreateRoomInputSchema.transform((data) => ({
  ...data,
  maxCapacity: parseInt(data.maxCapacity, 10),
  price: parseFloat(data.price),
  tags: data.tags ?? [],
  roomType: data.roomType ?? "SOLO",
}));

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;
export type CreateRoom = z.infer<typeof CreateRoomSchema>;
export type RoomTypeEnum = z.infer<typeof RoomTypeEnumSchema>;

export const GeometryTypeSchema = z.enum(["Point", "LineString", "Polygon"]);

export const BaseLocationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z
    .tuple([
      z.number().min(-180).max(180), // longitude
      z.number().min(-90).max(90), // latitude
    ])
    .refine(([lng, lat]) => lng !== 0 && lat !== 0, {
      message: "Coordinates must be valid and non-zero",
    }),
});

export const CreateLocationSchema = BaseLocationSchema.extend({
  city: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
});

export const GetLocationSchema = CreateLocationSchema.extend({
  id: z.number(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type GetLocationDto = z.infer<typeof GetLocationSchema>;
export type GeometryType = z.infer<typeof GeometryTypeSchema>;
export type LocationCoordinates = z.infer<typeof BaseLocationSchema>;
export type CreateLocationDto = z.infer<typeof CreateLocationSchema>;

/* ===========================
   OUTPUT SCHEMA (Backend → App)
   =========================== */

export const ImageResponseSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  fileFormat: z.literal("IMAGE"), // backend always returns "IMAGE"
  type: ImageTypeEnum, // e.g. "GALLERY", "THUMBNAIL"
  quality: ImageQualityEnum, // e.g. "LOW", "MEDIUM", "HIGH"
  createdAt: z.string().datetime(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  entityType: z.string(), // e.g. "ROOM" | "BOARDING_HOUSE"
  entityId: z.number(),
});

export type BackendImage = z.infer<typeof ImageResponseSchema>;

export const BoardingHouseImageSchema = z.object({
  id: z.number(),
  // If you don't want circular dependency with BoardingHouse, skip or use z.lazy
  boardingHouseId: z.number(),
  url: z.string().url(),
  type: ImageTypeEnum.optional(),
  quality: ImageQualityEnum.optional(),
  createdAt: z.string(),
});

export const PDFSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.literal("application/pdf"),
  size: z
    .number()
    .max(10 * 1024 * 1024)
    .optional(), // max 10mb
});

export const AMENITIES = [
  "WiFi",
  "FreeParking",
  "AirConditioner",
  "SwimmingPool",
  "Laundry",
  "CCTV",
  "BreakfastIncluded",
  "Kitchenette",
  "HairDryer",
  "Toiletries",
  "MiniFridge",
  "CoffeeTeaMaker",
  "DeskWorkspace",
  "TV",
  "Heating",
  "Wardrobe",
  "Safe",
  "LuggageRack",
  "Iron",
  "PowerAdapters",
  "GymFitnessCenter",
  "PetFriendly",
  "AirportShuttle",
  "24HourReception",
] as const;

export const PROPERTY_TYPES = ["Private", "Shared", "Mixed"] as const;

/**
 * Make AMENITIES a literal tuple:
 * export const AMENITIES = ["wifi","parking","aircon"] as const;
 */
export const AmenityEnum = z.enum(AMENITIES);
export type Amenity = z.infer<typeof AmenityEnum>;

const Timestamps = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const SoftDelete = z.object({
  isDeleted: z.boolean().default(false),
  deletedAt: z.string().datetime().nullable().optional(),
});

const MediaSchema = z.object({
  thumbnail: z.array(ImageResponseSchema).optional(),
  gallery: z.array(ImageResponseSchema).optional(),
  // If you truly need PDFs on the BH entity:
  permits: z.array(PDFSchema).optional(),
});

const CapacitySchema = z
  .object({
    totalCapacity: z.number().int().nonnegative(),
    currentCapacity: z.number().int().nonnegative(),
  })
  .refine((c) => c.currentCapacity <= c.totalCapacity, {
    message: "currentCapacity must be ≤ totalCapacity",
    path: ["currentCapacity"],
  });

// Core “entity” fields (no relations/timestamps)
const BoardingHouseCore = z.object({
  id: z.number().int().positive(),
  ownerId: z.number().int().positive(),
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string().optional(),
  amenities: z.array(AmenityEnum).default([]),
  availabilityStatus: z.boolean(),
  // If BH itself has a price, uncomment across the file for consistency:
  // price: z.number().nonnegative().optional(),
});

// Relations (when reading)
const BoardingHouseRelations = z.object({
  locationId: z.number().int().positive().optional(), // sometimes present on read
  location: GetLocationSchema, // resolved relation
  rooms: z.array(GetRoomSchema).optional(),
  capacity: CapacitySchema, // if you compute/store capacity on BH
  // bookings: z.array(GetBookingSchema).optional(),   // include only if you need it here
});

// ---------- READ SCHEMA (Get/List/FindOne) ----------
export const BoardingHouseReadSchema = BoardingHouseCore.merge(MediaSchema)
  .merge(Timestamps)
  .merge(SoftDelete)
  .merge(BoardingHouseRelations)
  .strict();

export type BoardingHouse = z.infer<typeof BoardingHouseReadSchema>;

// Keep these aliases if you like the old names:
export const GetBoardingHouseSchema = BoardingHouseReadSchema;
export type GetBoardingHouse = z.infer<typeof GetBoardingHouseSchema>;

export const FindOneBoardingHouseSchema = BoardingHouseReadSchema;
export type FindOneBoardingHouse = z.infer<typeof FindOneBoardingHouseSchema>;

// ---------- CREATE INPUT ----------
export const CreateBoardingHouseInputSchema = z.object({
  ownerId: z
    .number()
    .int()
    .positive({ message: "Owner ID must be a positive number" }),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().optional(),
  amenities: z.array(AmenityEnum).default([]),
  availabilityStatus: z.boolean().default(true),
  location: BaseLocationSchema, // create/attach a location
  rooms: z.array(CreateRoomInputSchema).optional(), // nested create
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
  // price: z.number().nonnegative().optional(),      // add if BH-level price is needed
});

export type CreateBoardingHouseInput = z.infer<
  typeof CreateBoardingHouseInputSchema
>;

// If you want a transformed “create output” (e.g., after normalizing room input):
export const CreateBoardingHouseOutputSchema =
  CreateBoardingHouseInputSchema.transform((data) => ({
    ...data,
    rooms: data.rooms ?? [], // keep it predictable if your service expects []
  }));

export type CreateBoardingHouse = z.infer<
  typeof CreateBoardingHouseOutputSchema
>;

// ---------- QUERY / FILTER ----------
export const QueryBoardingHouseSchema = z
  .object({
    id: z.coerce.number().int().positive().optional(),
    ownerId: z.coerce.number().int().positive().optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    availabilityStatus: z.coerce.boolean().optional(),
    // If BH-level price exists; otherwise compute on the service:
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    sortBy: z.enum(["name", "createdAt", "updatedAt" /*, "price"*/]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().max(100).default(20).optional(),
    // Keep these only if you truly use them; “offset” and “page/limit” usually conflict:
    offset: z.coerce.number().int().nonnegative().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    isDeleted: z.coerce.boolean().optional(),
    deletedAt: z.string().datetime().optional(), // keep .nullable() if you search for nulls specifically
  })
  .refine((q) => !(q.minPrice && q.maxPrice) || q.minPrice <= q.maxPrice, {
    message: "maxPrice must be ≥ minPrice",
    path: ["maxPrice"],
  })
  .refine(
    (q) => !(q.page && q.offset), // prefer page/limit or limit/offset, not both
    {
      message: "Use either page/limit or offset/limit, not both",
      path: ["offset"],
    }
  );
export type QueryBoardingHouse = z.infer<typeof QueryBoardingHouseSchema>;

export const mockBoardingHouses: BoardingHouse[] = [
  {
    id: 1,
    ownerId: 101,
    name: "Sunset Haven",
    address: "123 Beachside Ave, Cebu City",
    description: "A relaxing place near the beach with beautiful sunset views.",
    amenities: ["WiFi", "AirConditioner", "FreeParking", "CCTV", "TV"],
    availabilityStatus: true,
    location: {
      id: 1,
      type: "Point",
      coordinates: [123.894, 10.315],
      city: "Cebu City",
      province: "Cebu",
      country: "Philippines",
      isDeleted: false,
      deletedAt: null,
    },
    thumbnail: [],
    gallery: [],
    rooms: [
      {
        id: 101,
        roomNumber: "A101",
        maxCapacity: 2,
        currentCapacity: 1,
        price: 2500,
        roomType: "DUO",
        tags: ["PrivateBathroom", "Balcony"],
        availabilityStatus: true,
        createdAt: "2025-01-01T12:00:00Z",
        updatedAt: "2025-01-05T12:00:00Z",
        isDeleted: false,
        deletedAt: null,
        gallery: [],
        thumbnail: [],
      },
      {
        id: 102,
        roomNumber: "A102",
        maxCapacity: 4,
        currentCapacity: 2,
        price: 4000,
        roomType: "FAMILY",
        tags: ["FullKitchen", "Balcony"],
        availabilityStatus: true,
        createdAt: "2025-01-02T12:00:00Z",
        updatedAt: "2025-01-06T12:00:00Z",
        isDeleted: false,
        deletedAt: null,
        gallery: [],
        thumbnail: [],
      },
    ],
    capacity: {
      totalCapacity: 6,
      currentCapacity: 3,
    },
    createdAt: "2025-01-01T12:00:00Z",
    updatedAt: "2025-02-01T12:00:00Z",
    isDeleted: false,
    deletedAt: null,
  },
  {
    id: 2,
    ownerId: 102,
    name: "Cityscape Lodge",
    address: "456 Downtown Blvd, Manila",
    description: "Modern lodge in the heart of the city.",
    amenities: [
      "WiFi",
      "BreakfastIncluded",
      "Laundry",
      "CCTV",
      "DeskWorkspace",
    ],
    availabilityStatus: true,
    location: {
      id: 2,
      type: "Point",
      coordinates: [121.0437, 14.676],
      city: "Manila",
      province: "Metro Manila",
      country: "Philippines",
      isDeleted: false,
      deletedAt: null,
    },
    thumbnail: [],
    gallery: [],
    rooms: [
      {
        id: 201,
        roomNumber: "B201",
        maxCapacity: 1,
        currentCapacity: 0,
        price: 1800,
        roomType: "SOLO",
        tags: ["Bathtub", "AirConditioning"],
        availabilityStatus: true,
        createdAt: "2025-03-05T08:00:00Z",
        updatedAt: "2025-03-05T09:00:00Z",
        isDeleted: false,
        deletedAt: null,
        gallery: [],
        thumbnail: [],
      },
      {
        id: 202,
        roomNumber: "B202",
        maxCapacity: 2,
        currentCapacity: 1,
        price: 2600,
        roomType: "DUO",
        tags: ["CityView", "Desk"],
        availabilityStatus: true,
        createdAt: "2025-03-05T08:00:00Z",
        updatedAt: "2025-03-06T10:00:00Z",
        isDeleted: false,
        deletedAt: null,
        gallery: [],
        thumbnail: [],
      },
    ],
    capacity: {
      totalCapacity: 3,
      currentCapacity: 1,
    },
    createdAt: "2025-03-05T08:00:00Z",
    updatedAt: "2025-03-06T10:00:00Z",
    isDeleted: false,
    deletedAt: null,
  },
  {
    id: 3,
    ownerId: 103,
    name: "Mountain Breeze Boarding House",
    address: "789 Pinehill Road, Baguio City",
    description: "Peaceful mountain stay surrounded by pine trees.",
    amenities: ["Heating", "WiFi", "FreeParking", "PetFriendly"],
    availabilityStatus: false,
    location: {
      id: 3,
      type: "Point",
      coordinates: [120.589, 16.402],
      city: "Baguio",
      province: "Benguet",
      country: "Philippines",
      isDeleted: false,
      deletedAt: null,
    },
    thumbnail: [],
    gallery: [],
    rooms: [
      {
        id: 301,
        roomNumber: "C301",
        maxCapacity: 3,
        currentCapacity: 3,
        price: 3200,
        roomType: "TRIO",
        tags: ["Bathtub", "Balcony"],
        availabilityStatus: false,
        createdAt: "2025-04-10T12:00:00Z",
        updatedAt: "2025-04-11T09:00:00Z",
        isDeleted: false,
        deletedAt: null,
        gallery: [],
        thumbnail: [],
      },
    ],
    capacity: {
      totalCapacity: 3,
      currentCapacity: 3,
    },
    createdAt: "2025-04-10T12:00:00Z",
    updatedAt: "2025-04-11T09:00:00Z",
    isDeleted: false,
    deletedAt: null,
  },
];
