'use client'
import React from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';

type Props = {

}
const page = (props: Props) => {
    return (
        <div>
            <Heading
                title='ELearning'
                description='ELearning is a platform for students to learn and get help from teachers'
                keywords='Programming, MERN, Redux, Machine Learning'
            />
            <div className="flex h-[200vh]">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-85%">

                </div>
            </div>
        </div>

    )
}
export default page;