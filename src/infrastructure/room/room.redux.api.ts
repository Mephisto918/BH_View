import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import api from "@/app/config/api";
import { Room } from "./room.dto";
import { ApiResponseType } from "../common/types/api.types";

const roomApiRoute = `/api/boarding-houses/`;
export const roomApi = createApi({
  tagTypes: ["Room"],
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
    // skips the fetchFn that logs, for debugging only
    //  fetchFn: async (input, init) => {
    //   console.log("FETCHING URL:", input);
    //   console.log("FETCH INIT:", init);
    //   return fetch(input, init);
    // },
  }),

  endpoints: (builder) => ({
    getAll: builder.query<Room[], number>({
      query: (id) => `${roomApiRoute}/${id}/rooms`,
      transformResponse: (response: ApiResponseType<Room[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<Room, { boardingHouseId: number; roomId: number }>({
      query: ({ boardingHouseId, roomId }) => ({
        url: `${roomApiRoute}/${boardingHouseId}/rooms/${roomId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponseType<Room>) =>
        response.results ?? null,
    }),
    create: builder.mutation<
      Room,
      { boardingHouseId: number | string; data: Partial<Room>[] }
    >({
      query: ({ boardingHouseId, data }) => ({
        url: `${roomApiRoute}/${boardingHouseId}/rooms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),
    delete: builder.mutation<Room, { boardingHouseId: number; roomId: number }>(
      {
        query: ({ boardingHouseId, roomId }) => ({
          url: `${roomApiRoute}/${boardingHouseId}/rooms/${roomId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Room"],
      }
    ),
  }),
});

export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteMutation,
} = roomApi;
