import React, { useState } from 'react'

type Props = {
  id: string;
}

const CourseDetailsPage = ({ id }: Props) => {

  const [route,setRoute] = useState("Login");
  const [open,setOpen] = useState(false);
  const {data,isLoading} = useGetCourseDetailsQuery(id);
  
  return (
    <div>CourseDetailsPage</div>
  )
}

export default CourseDetailsPage