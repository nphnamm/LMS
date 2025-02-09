import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react'

type Props = {
    item:any;

}

const ReviewCard = (props: Props) => {
    console.log("props",props)
  return (
    <div className='w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#0000002B] dark:border-[#ffffff1d] backdrop-blur '>
        <div className='flex w-full'>
            <Image
            src={props?.item?.avatar}
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className='800px:flex justify-between w-full hidden'>
                <div className='pl-4'>
                    <h5 className='text-[20px] text-black dark:text-white'>
                        {props.item.name}
                    </h5>
                    <h6 className='text-[16px] text-[#000] dark:text-[#ffffffab]'>
                        {props.item.profession}
                    </h6>
                </div>
                <Ratings rating={props.item.ratings}/>


            </div>

        </div>
    </div>

)
}

export default ReviewCard