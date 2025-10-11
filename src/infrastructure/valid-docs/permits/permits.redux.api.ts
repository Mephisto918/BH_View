import api from "@/application/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ApiResponseType } from "@/infrastructure/common/types/api.types";
import {
  CreatePermit,
  GetPermit,
  GetPermitVerificationStatus,
  UpdatePermit,
} from "./permits.types";

const ownerPermitsApiRoute = `/api/owners`;

export const permitsApi = createApi({
  reducerPath: "ownersPermitsApi",
  tagTypes: ["Permits"],
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
  }),

  endpoints: (builder) => ({
    getAll: builder.query<GetPermit[], void>({
      query: () => `${ownerPermitsApiRoute}/permits`,
      transformResponse: (response: ApiResponseType<GetPermit[]>) =>
        response.results ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: "Permits" as const, id: p.id })),
              { type: "Permits" as const, id: "LIST" },
            ]
          : [{ type: "Permits" as const, id: "LIST" }],
    }),
    getPermitVerificationStatus: builder.query<
      GetPermitVerificationStatus,
      number
    >({
      query: (id) => `${ownerPermitsApiRoute}/${id}/permits`,
      transformResponse: (
        response: ApiResponseType<GetPermitVerificationStatus>
      ) => response.results!,
      providesTags: (result, error, id) => [{ type: "Permits", id }],
    }),
    create: builder.mutation<GetPermit, CreatePermit>({
      query: (data) => ({
        url: `${ownerPermitsApiRoute}/permits`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Permits", id: "LIST" }],
    }),

    patch: builder.mutation<
      GetPermit,
      { permitId: number; data: UpdatePermit }
    >({
      query: ({ permitId, data }) => ({
        url: `${ownerPermitsApiRoute}/permits/${permitId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { permitId }) => [
        { type: "Permits", id: permitId },
        { type: "Permits", id: "LIST" },
      ],
    }),

    delete: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `${ownerPermitsApiRoute}/${id}/permits`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Permits", id },
        { type: "Permits", id: "LIST" },
      ],
    }),
  }),
});
