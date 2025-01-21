import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetAllUserQuery } from '@/redux/features/user/userApi'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

type Props = {
    isDashboard?: boolean
}

const AllInvoices = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const { isLoading, data } = useGetAllCoursesQuery({});
    const { data: usersData } = useGetAllUserQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData,setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                const user = usersData?.users.find((user: any) => user._id === item.userId);
                const course = coursesData.courses.find((course: any) => course.id === item.courseId)
                return {
                    ...item,
                    userName: user?.name,
                    userEmail:user?.email,
                    title:course?.name,
                    price: "$" + course?.price
                }
            });
            setOrderData(temp);
        }
    },[data,usersData,coursesData]);


    return (
        <div>AllInvoices</div>
    )
}

export default AllInvoices