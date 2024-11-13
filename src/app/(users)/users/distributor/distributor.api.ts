import { apiSlice } from "@redux/apiSlice";
import { API_ENDPOINT } from "./distributor.config";

export const distributorUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistributorUsers: builder.query({
      query: () => API_ENDPOINT,
      keepUnusedDataFor: 600,
      providesTags: ["distributorUsers"],
    }),
    getDistributorUser: builder.query({
      query: (id) => `${API_ENDPOINT}/${id}`,
      providesTags: (result, error, arg) => [{ type: "agentUser", id: arg }],
    }),
    createDistributorUser: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["distributorUsers"],
    }),
    editDistributorUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "distributorUsers",
        { type: "distributorUser", id: arg.id },
      ],
    }),
    deleteDistributorUser: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["distributorUsers"],
    }),
  }),
});

export const {
  useGetDistributorUsersQuery,
  useGetDistributorUserQuery,
  useCreateDistributorUserMutation,
  useEditDistributorUserMutation,
  useDeleteDistributorUserMutation,
} = distributorUsersApi;
