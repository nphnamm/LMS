import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import CourseContent from '../../Course/CourseContent';
import Loader from '../../Loader/Loader';

type Props = {
    params:any;
}

const page = ({params}: Props) => {
    const id = params.id;
    const {isLoading,error,data} = useLoadUserQuery(undefined,{});
    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:any)=> item._id === id);
            if(!isPurchased){
                redirect("/");

            }
            if(error){
                redirect("/");
            }
        }
        
    },[data,error])
  
    return (
    
    <>
        {isLoading ? (
            <Loader/>
        ) : (
            <div>
                <CourseContent id={id}/>
            </div>
        )}
        
        </>    
    
  )
}

export default page