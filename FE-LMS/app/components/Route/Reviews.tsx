import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react'
import ReviewCard from '../Review/ReviewCard';

type Props = {}



export const reviews = [
    {
        name: "Gene Bates",
        avatar: "hhttps://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full stack developer | Quarter ltd.",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "computer systems engineering student | Zimbabwe",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
        name: "Rosemary Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
    {
        name: "Laura Mckenize",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    },
];

const Reviews = (props: Props) => {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center'>
                <div className='800px:w-[50%] w-full'>
                    {/* <Image
                        src={require("../../../public/images/business.png")}
                        alt='business'
                        width={700}
                        height={700}
                    /> */}
                    <div className='800px:w-[50%] w-full'>
                        <h3 className={`${styles.title} 800px:!text-[40px]`}>
                            Our Students Are <span className='text-gradient'>Our Strength</span>{" "}
                        </h3>
                        <br />
                        <p className={styles.label}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        </p>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[40px]'>
                {reviews && reviews.map((i, index) => (
                    <ReviewCard item={i} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Reviews