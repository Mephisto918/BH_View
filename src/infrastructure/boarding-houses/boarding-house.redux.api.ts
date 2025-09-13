import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "../common/types/api.types";
import api from "@/application/config/api";
import {
  QueryBoardingHouse,
  QueryBoardingHouseSchema,
  FindOneBoardingHouseSchema,
  BoardingHouseReadSchema,
  BoardingHouse,
  FindOneBoardingHouse,
  CreateBoardingHouseInput,
} from "./boarding-house.schema-improved";

import z from "zod";

//* -- createApi --
const boardingHouseApiRoute = `/api/boarding-houses`;
export const boardingHouseApi = createApi({
  tagTypes: ["BoardingHouse"],
  reducerPath: "boardingHouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
    // skips the fetchFn that logs, for debugging only
    fetchFn: async (input, init) => {
      console.log("FETCHING URL:", input);
      console.log("FETCH INIT:", init);
      return fetch(input, init);
    },
  }),
  endpoints: (builder) => ({
    getAll: builder.query<BoardingHouse[], QueryBoardingHouse | undefined>({
      query: (params) => {
        const parsed = QueryBoardingHouseSchema.safeParse(params ?? {});
        if (!parsed.success) {
          console.error("Invalid query params", parsed.error.format());
          return boardingHouseApiRoute; // fallback without query
        }

        const queryParams = new URLSearchParams(
          Object.fromEntries(
            Object.entries(parsed.data)
              .filter(([_, v]) => v != null)
              .map(([key, value]) => [key, String(value)]) // <-- cast to string
          )
        );

        return `${boardingHouseApiRoute}?${queryParams.toString()}`;
      },
      transformResponse: (response: ApiResponseType<BoardingHouse[]>) =>
        response.results ?? [],
      // transformResponse: (response: ApiResponseType<BoardingHouse>) =>
      //   z.array(BoardingHouseReadSchema).parse(response.results ?? []),
    }),
    getOne: builder.query<FindOneBoardingHouse | null, number | null>({
      query: (id) => `${boardingHouseApiRoute}/${id}`,
      transformResponse: (response: ApiResponseType<FindOneBoardingHouse>) => {
        if (!response.results) return null;

        // Use Zod to validate / parse the single result
        // return FindOneBoardingHouseSchema.parse(response.results[0]);
        const res = response.results;
        return res[0];
      },
    }),
    // TODO make a dto for one source of truth
    create: builder.mutation<any, CreateBoardingHouseInput>({
      query: (data) => {
        const formData = new FormData();

        // Text fields
        formData.append("ownerId", String(data.ownerId));
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("description", data.description || "");
        formData.append("availabilityStatus", String(data.availabilityStatus));
        formData.append("amenities", JSON.stringify(data.amenities));
        formData.append("location", JSON.stringify(data.location));

        // ✅ Only use this version (no gallery)
        const roomsWithoutGallery = (data.rooms ?? []).map(
          ({ gallery, ...rest }) => rest
        );
        formData.append("rooms", JSON.stringify(roomsWithoutGallery));

        // 📦 Send per-room gallery files
        data.rooms?.forEach((room, index) => {
          room.gallery?.forEach((file) => {
            formData.append(`roomGallery${index}`, {
              uri: file.uri,
              name: file.name,
              type: file.type,
            } as any);
          });
        });

        // ✅ Thumbnail (1 file)
        if (data.thumbnail?.[0]) {
          const file = data.thumbnail[0];
          formData.append("thumbnail", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        }

        // ✅ Gallery (multiple)
        data.gallery?.forEach((file) => {
          formData.append("gallery", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        });

        for (const [key, value] of formData.entries()) {
          if (typeof value === "object" && value.uri) {
            console.log(`${key}: [File] ${value.name} (${value.type})`);
          } else {
            console.log(`${key}:`, value);
          }
        }

        console.log({
          url: boardingHouseApiRoute,
          method: "POST",
          body: formData,
        });

        return {
          url: boardingHouseApiRoute,
          method: "POST",
          body: formData,
        };
        // return {} as any;
      },
    }),

    delete: builder.mutation<BoardingHouse, number>({
      query: (id) => ({
        url: `${boardingHouseApiRoute}/${id}`,
        method: "DELETE",
      }),
      //* Optional: invalidates cache for "BoardingHouse"
      invalidatesTags: ["BoardingHouse"],
    }),
  }),
});
export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateMutation,
  useDeleteMutation,
} = boardingHouseApi;
