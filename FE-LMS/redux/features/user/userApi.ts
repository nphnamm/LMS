import { apiSlice } from "../api/apiSlice";



export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvater: builder.mutation({
            query: (avatar) => ({
                url: `/update-user-avatar`,
                method: 'PUT',
                body: { avatar },
                credentails: "include" as const,
            })
        })

    })
})
