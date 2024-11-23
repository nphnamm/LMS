import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'

type Props = {

    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;

}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    }
    const handleFileChange = (e:any) =>{
        const file = e.target.files?.[0];
        if(file){
            const reader = new FileReader()
            reader.onload = (e:any)=>{
                if(reader.readyState  ===2){
                    setCourseInfo({...courseInfo,thumbnail:reader.result})
                }
            }
        }
    }
    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit} className="${styles.label}">
                <div >
                    <label htmlFor="">

                        Course Name
                    </label>

                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo?.name}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        id='name'
                        placeholder='MERN STack LMS Platform with NextJS 13'
                        className={`
                        ${styles.input}
                        `}
                    />

                </div>
                <br />
                <div className="mb-5">
                    <label className={`${styles.label}`}> Course Description</label>
                    <textarea
                        id=""
                        name=""
                        cols={30}
                        rows={8}
                        required
                        value={courseInfo?.description}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                        placeholder='Write something amazing...'
                        className={`
                        ${styles.input} !h-min !py-2 
                        `}
                    />
                </div>
                <br />
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>Course Price</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo?.price}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            id='price'
                            placeholder='29'

                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>Estimated Price (optional)</label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo?.estimatedPrice}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            id='price'
                            placeholder='79'
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>

                </div>
                <br />
                <div>
                    <label className={`${styles.label}`}>Course Tags</label>
                    <input
                        type="text"
                        name=""
                        required
                        value={courseInfo?.tags}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        id='tags'
                        placeholder='MERN, Next 13, Socket io, tailwind css, LMS'

                        className={`
                        ${styles.input}
                        `}
                    />
                </div>
                <br/>
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>Course Level</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo?.level}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            id='level'
                            placeholder='Begineer/Intermediate/Expert'

                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>Demo URL</label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo?.demoUrl}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                            id='demoUrl'
                            placeholder='themovie.vercel.com'
                            className={`
                        ${styles.input}
                        `}
                        />
                    </div>

                </div>
                <br/>
                <div className='w-full'>
                    <input
                        type='file'
                        accept='image/*'
                        id='file'
                        className='hidden'
                        onChange={handleFileChange}
                    />

                </div>

            </form>


        </div>
    )
}

export default CourseInformation