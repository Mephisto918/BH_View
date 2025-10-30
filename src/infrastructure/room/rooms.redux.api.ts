import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "@/application/config/api";
import { ApiResponseType } from "../common/types/api.types";
import { CreateRoom, FindOneRoom, GetRoom } from "./rooms.schema";

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
    getAll: builder.query<GetRoom[], number>({
      query: (id) => `${roomApiRoute}${id}/rooms`,
      transformResponse: (response: ApiResponseType<GetRoom[]>) =>
        response.results ?? [],
    }),
    getOne: builder.query<
      FindOneRoom,
      { boardingHouseId: number; roomId: number }
    >({
      query: ({ boardingHouseId, roomId }) => ({
        url: `${roomApiRoute}${boardingHouseId}/rooms/${roomId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponseType<FindOneRoom>) =>
        response.results ?? null,
    }),
    create: builder.mutation<
      CreateRoom,
      { boardingHouseId: number | string; data: Partial<CreateRoom>[] }
    >({
      query: ({ boardingHouseId, data }) => ({
        url: `${roomApiRoute}${boardingHouseId}/rooms`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Room"],
    }),
    delete: builder.mutation<
      GetRoom,
      { boardingHouseId: number; roomId: number }
    >({
      query: ({ boardingHouseId, roomId }) => ({
        url: `${roomApiRoute}${boardingHouseId}/rooms/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteMutation,
} = roomApi;
