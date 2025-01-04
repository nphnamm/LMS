import { apiSlice } from "../api/apiSlice";



export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => (
                {
                
                url: `create-course`,
                method: 'POST',
                body:data,
                credentials: 'include' as const
            })
        }),
        getAllCourses: builder.query({
            query: () => (
                { 
                url:"get-all-courses",
                method: 'POST',
                credentials: 'include' as const
            })
        }),

    })
})

export const {useCreateCourseMutation, useGetAllCoursesQuery} = userApi;