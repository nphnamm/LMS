import { apiSlice } from "./../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: (type) => ({
                url: "get-all-notification",
                method: "GET",  
                credentials: "include" as const,
            }),
        }),
        updateNotificationStatus: builder.mutation({
            query: (id:string) => ({
                url: `/update-notification/${id}`,
                method: "PUT",
                
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } = notificationsApi;
