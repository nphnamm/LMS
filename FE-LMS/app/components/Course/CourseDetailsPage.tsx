'use client'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';

type Props = {
    id:string

}

const CourseDetailsPage = ({id}: Props) => {
  console.log(id);
  const [route,setRoute] = useState("Login");
  const [open,setOpen]=useState(false)
  const {data,isLoading}= useGetCourseDetailsQuery(id);
  console.log("data",data)

  return (
    <>
      {isLoading ? (
        <Loader/>
      ):(
        <div>
          <Heading
          title={data?.course?.name + "- ELearning"}
          description={"Elearning is programming comminity which is developed by NAMNPHfor helping programmers"}
        keywords={data?.course?.tags}
/>
<>hello</>

        </div>
      )}
    </>
  )
}

export default CourseDetailsPage