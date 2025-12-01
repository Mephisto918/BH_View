import api from "@/application/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponseType } from "@/infrastructure/common/types/api.types";
import {
  VerificationDocumentMetaData,
  CreateVerificationDocumentDto,
  UpdateVerificationDocumentDto,
  UserRoleType,
  VerificationDocumentStatus,
} from "./verification-document.schema"; // <-- import your Zod types
import { AppDocumentFile } from "@/infrastructure/document/document.schema";

const ownerPermitsApiRoute = `/api`;

export const verificationDocumentsApi = createApi({
  reducerPath: "verificationDocumentsApi",
  tagTypes: ["VerificationDocuments"],
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
  }),

  endpoints: (builder) => ({
    getAll: builder.query<VerificationDocumentMetaData[], UserRoleType>({
      query: (sourceTarget: UserRoleType) =>
        `${ownerPermitsApiRoute}/${sourceTarget}/permits`,
      transformResponse: (
        response: ApiResponseType<VerificationDocumentMetaData[]>
      ) => response.results ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((doc) => ({
                type: "VerificationDocuments" as const,
                id: doc.id,
              })),
              { type: "VerificationDocuments" as const, id: "LIST" },
            ]
          : [{ type: "VerificationDocuments" as const, id: "LIST" }],
    }),

    getById: builder.query<
      VerificationDocumentMetaData,
      { id: number; sourceTarget: UserRoleType }
    >({
      query: ({ id, sourceTarget }) =>
        `${ownerPermitsApiRoute}/${sourceTarget}/${id}/permits`,
      transformResponse: (
        response: ApiResponseType<VerificationDocumentMetaData>
      ) => response.results!,
      providesTags: (result, error, { id, sourceTarget }) => [
        { type: "VerificationDocuments", id: `${sourceTarget}-${id}` },
      ],
    }),

    getVerificationStatus: builder.query<
      VerificationDocumentStatus,
      { id: number; sourceTarget: UserRoleType }
    >({
      query: ({ id, sourceTarget }) => {
        console.log("getVerificationStatus query called with:", {
          id,
          sourceTarget,
        });
        console.log(
          `${ownerPermitsApiRoute}/${sourceTarget}/${id}/permit-verification-status`
        );
        return `${ownerPermitsApiRoute}/${sourceTarget}/${id}/permit-verification-status`;
      },
      transformResponse: (
        response: ApiResponseType<VerificationDocumentStatus>
      ) => {
        console.log("getVerificationStatus transformResponse:", response);
        return response.results!;
      },
      providesTags: (result, error, { id, sourceTarget }) => [
        { type: "VerificationDocuments", id: `${sourceTarget}-${id}` },
      ],
    }),

    createVerificaitonDocument: builder.mutation<
      VerificationDocumentMetaData,
      {
        data: CreateVerificationDocumentDto;
        sourceTarget: UserRoleType;
        file: AppDocumentFile; // Blob or File
      }
    >({
      query: ({ data, sourceTarget, file }) => {
        const formData = new FormData();

        // Append your DTO values
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as any);
        });

        // Append the Blob/File
        formData.append("file", file);

        return {
          url: `${ownerPermitsApiRoute}/${sourceTarget}/permits`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "VerificationDocuments", id: "LIST" }],
    }),

    patchVerificaitonDocument: builder.mutation<
      VerificationDocumentMetaData,
      {
        id: number;
        sourceTarget: UserRoleType;
        data: UpdateVerificationDocumentDto;
        file: AppDocumentFile;
      }
    >({
      query: ({ id, sourceTarget, data, file }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as any);
        });

        formData.append("file", file);

        return {
          url: `${ownerPermitsApiRoute}/${sourceTarget}/permits/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "VerificationDocuments", id },
        { type: "VerificationDocuments", id: "LIST" },
      ],
    }),

    delete: builder.mutation<
      { success: boolean },
      { id: number; sourceTarget: UserRoleType }
    >({
      query: ({ id, sourceTarget }) => ({
        url: `${ownerPermitsApiRoute}/${sourceTarget}/permits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id, sourceTarget }) => [
        { type: "VerificationDocuments", id: `${sourceTarget}-${id}` },
        { type: "VerificationDocuments", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for React components
export const {
  useGetAllQuery,
  useGetByIdQuery,
  useGetVerificationStatusQuery,
  useCreateVerificaitonDocumentMutation,
  usePatchVerificaitonDocumentMutation,
  useDeleteMutation,
} = verificationDocumentsApi;

//* findAllVerificationDocument()
//* findOneVerificationDocument()
//* getVerificationStatus()
//* patchVerificationDocument()
//* createVerificationDocument()
//* removeVerificationDocument()
