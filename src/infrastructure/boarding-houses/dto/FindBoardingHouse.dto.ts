export interface FindBoardingHouseDto {
  id?: number;
  ownerId?: number;
  name?: string;
  address?: string;
  availabilityStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Date;
  deletedAt?: Date;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  offset?: number;
}
