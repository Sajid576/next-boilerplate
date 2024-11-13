import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { API_ENDPOINT } from "./config";

const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const session = await getSession();
    const token = session?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: customBaseQuery, // Use the custom base query here
  tagTypes: ["Users", "User", "Roles", "Role"],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: ({ page=1, limit=100 }) => `${API_ENDPOINT}?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 600,
      providesTags: ["Roles"],
    }),
    getRole: builder.query({
      query: (id) => `${API_ENDPOINT}/${id}`,
      providesTags: (result, error, arg) => [{ type: "Role", id: arg }],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),
    editRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Roles",
        { type: "Role", id: arg.id },
      ],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const { useGetRolesQuery, useGetRoleQuery, useCreateRoleMutation, useEditRoleMutation, useDeleteRoleMutation } = rolesApi;
