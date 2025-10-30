import api from "@/application/config/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CancelBookingInput,
  PatchApproveBookingInput,
  PatchRejectBookingInput,
  PatchVerifyPaymentInput,
} from "./booking.schema";
import {
  CreateBookingInput,
  GetBooking,
  PatchTenantBookingInput,
  QueryBooking,
  QueryBookingSchema,
} from "./booking.schema";
import { ApiResponseType } from "../common/types/api.types";
import { CreatePaymentProofInput } from "./booking.schema";
import { AppImageFile } from "../image/image.schema";

const bookingApiRoute = `api/bookings`;
export const bookingApi = createApi({
  tagTypes: ["Booking"],
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api.BASE_URL,
    fetchFn: async (Input, init) => {
      return fetch(Input, init);
    },
  }),

  endpoints: (builder) => ({
    getAll: builder.query<GetBooking[], QueryBooking | undefined>({
      query: (params) => {
        const parsed = QueryBookingSchema.safeParse(params ?? {});
        if (!parsed.success) {
          console.error("Invalid query params", parsed.error.format());
          return bookingApiRoute; //* fallback
        }

        const queryParams = new URLSearchParams(
          Object.entries(parsed.data)
            .filter(([_, v]) => v != null)
            .map(([k, v]) => [k, String(v)])
        );
        return `${bookingApiRoute}?${queryParams.toString()}`;
      },
      transformResponse: (response: { results: GetBooking[] }) =>
        response.results ?? [],
      providesTags: ["Booking"],
    }),
    getOne: builder.query<GetBooking | null, number>({
      query: (id) => `${bookingApiRoute}/${id}`,
      transformResponse: (response: { results: GetBooking }) =>
        response.results ?? null,

      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation<
      GetBooking,
      { roomId: number; payload: CreateBookingInput }
    >({
      query: ({ payload, roomId }) => ({
        url: `${bookingApiRoute}/${roomId}`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
    patchTenantBooking: builder.mutation<
      GetBooking,
      { id: number; payload: PatchTenantBookingInput }
    >({
      query: ({ id, payload }) => ({
        url: `${bookingApiRoute}/${id}`,
        method: "PATCH",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
    patchApproveBooking: builder.mutation<
      GetBooking,
      { id: number; payload: PatchApproveBookingInput }
    >({
      query: ({
        id,
        payload,
      }): { url: string; method: string; body: PatchApproveBookingInput } => ({
        url: `${bookingApiRoute}/${id}/owner/approve`,
        method: "PATCH",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
    patchRejectBooking: builder.mutation<
      GetBooking,
      { id: number; payload: PatchRejectBookingInput }
    >({
      query: ({
        id,
        payload,
      }): { url: string; method: string; body: PatchRejectBookingInput } => ({
        url: `${bookingApi}/${id}/owner/reject`,
        method: "Patch",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
    createPaymentProof: builder.mutation<
      GetBooking,
      { id: number; payload: CreatePaymentProofInput } // input type
    >({
      query: ({
        id,
        payload,
      }): { url: string; method: string; body: FormData } => {
        const formData = new FormData();

        // Append payload fields
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Append the file
        formData.append("payment_proof", payload.paymentImage);

        return {
          url: `${bookingApi}/${id}/payment-proof`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),

    patchVerifyPayment: builder.mutation<
      GetBooking,
      { id: number; payload: PatchVerifyPaymentInput }
    >({
      query: ({
        id,
        payload,
      }): { url: string; method: string; body: PatchVerifyPaymentInput } => ({
        url: `${bookingApi}/${id}/verify-payment`,
        method: "Patch",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation<
      GetBooking,
      { id: number; payload: CancelBookingInput }
    >({
      query: ({
        id,
        payload,
      }): { url: string; method: string; body: CancelBookingInput } => ({
        url: `${bookingApi}/${id}/cancel`,
        method: "Post",
        body: payload,
      }),
      transformResponse: (response: ApiResponseType<GetBooking>) =>
        response.results ?? null,
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetOneQuery,
  useCreateBookingMutation,
  usePatchTenantBookingMutation,
  usePatchApproveBookingMutation,
  usePatchRejectBookingMutation,
  useCreatePaymentProofMutation,
  usePatchVerifyPaymentMutation,
  useCancelBookingMutation,
} = bookingApi;
