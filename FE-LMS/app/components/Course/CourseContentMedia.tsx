import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';

type Props = {
    data:any;
    id:string;
    activeVideo:number;
    setActivevideo: (activeVideo:number) => void;
}

const CourseContentMedia = ({data,id,activeVideo,setActivevideo}: Props) => {
  return (
    <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
        <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className='w-full flex items-center justify-between my-3'>
            <div className={`${styles.button} !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
            onClick={()=>setActivevideo(activeVideo === 0 ? 0 :activeVideo-1)}
            >
                <AiOutlineArrowLeft className='mr-2'/>
            </div>

        </div>

    </div>
  )
}

export default CourseContentMedia