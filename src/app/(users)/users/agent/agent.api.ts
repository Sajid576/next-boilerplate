import { apiSlice } from "@redux/apiSlice";
import { API_ENDPOINT } from "./agent.config";

export const agentUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentUsers: builder.query({
      query: () => API_ENDPOINT,
      keepUnusedDataFor: 600,
      providesTags: ["agentUsers"],
    }),
    getAgentUser: builder.query({
      query: (id) => `${API_ENDPOINT}/${id}`,
      providesTags: (result, error, arg) => [{ type: "agentUser", id: arg }],
    }),
    createAgentUser: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["agentUsers"],
    }),
    editAgentUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "agentUsers",
        { type: "agentUser", id: arg.id },
      ],
    }),
    deleteAgentUser: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["agentUsers"],
    }),
  }),
});

export const {
  useGetAgentUsersQuery,
  useGetAgentUserQuery,
  useCreateAgentUserMutation,
  useEditAgentUserMutation,
  useDeleteAgentUserMutation,
} = agentUsersApi;
