import api from "@/application/config/api";
import {
  createApi,
  fetchBaseQuery,
  TagDescription,
} from "@reduxjs/toolkit/dist/query/react";
import { BoundsQuery, MapMarker, NearbyQuery } from "./map.types";
import { QueryBoardingHouseSchema } from "../boarding-houses/boarding-house.schema";
import { ApiResponseType } from "../common/types/api.types";
import { get } from "@gluestack-style/react";

const mapsApiRoute = "/api/maps";
export const mapsApi = createApi({
  tagTypes: ["Map"],
  reducerPath: "mapsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
  }),

  endpoints: (builder) => ({
    // getAll: builder.query<[], void>({
    //   query: () =>
    // }),
    getAll: builder.query<MapMarker[], NearbyQuery>({
      query: (params) => {
        const parsed = QueryBoardingHouseSchema.safeParse(params ?? {});
        if (!parsed.success) {
          console.error("Invalid query params", parsed.error.format());
          return mapsApiRoute; // fallback without query
        }

        const queryParams = new URLSearchParams(
          Object.fromEntries(
            Object.entries(parsed.data)
              .filter(([_, v]) => v != null)
              .map(([key, value]) => [key, String(value)]) // <-- cast to string
          )
        );

        return `${mapsApiRoute}?${queryParams.toString()}`;
      },
      transformResponse: (response: ApiResponseType<MapMarker[]>) =>
        response.results ?? [],
      providesTags: (
        result: MapMarker[] | undefined,
        error,
        arg
      ): TagDescription<"Map">[] => {
        const tags: TagDescription<"Map">[] = [{ type: "Map", id: "LIST" }];

        result?.forEach((bh) => {
          tags.push({ type: "Map", id: bh.id });
        });

        return tags;
      },
    }),
    getBounds: builder.query<ApiResponseType<MapMarker[]>, BoundsQuery>({
      query: (params) => {
        const parsed = QueryBoardingHouseSchema.safeParse(params ?? {});
        if (!parsed.success) {
          console.error("Invalid query params", parsed.error.format());
          return mapsApiRoute; // fallback without query
        }

        const queryParams = new URLSearchParams(
          Object.fromEntries(
            Object.entries(parsed.data)
              .filter(([_, v]) => v != null)
              .map(([key, value]) => [key, String(value)]) // <-- cast to string
          )
        );

        return `${mapsApiRoute}?${queryParams.toString()}`;
      },
      transformResponse: (response: ApiResponseType<MapMarker[]>) => response,
      providesTags: (result) => {
        const tags: TagDescription<"Map">[] = [{ type: "Map", id: "LIST" }];

        result?.results?.forEach((bh) => {
          tags.push({ type: "Map", id: bh.id });
        });

        return tags;
      },
    }),
  }),
});
