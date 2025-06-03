import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import api from "@/config/api";

export const boardingHouseApi = createApi({
  reducerPath: 'boardingHouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${api.BASE_URL}${api.PORT}/api/` }),
  endpoints:((builder)=>({
    // can change such as in map, to only view location and thumbnail to not overfetch
    // can be typed => builder.query<type>({})

    //                              <[],void> -> needs further typing
    getBoardingHouses: builder.query<[],void>({
      query: ()=> 'boarding_houses'
    }),
    getBBoardingHousesById: builder.query({
      query: (id)=> `boarding_houses/${id}`
    }),
  })),
})

// yawa use[Endpoint]Query
export const { useGetBoardingHousesQuery, useGetBBoardingHousesByIdQuery } = boardingHouseApi