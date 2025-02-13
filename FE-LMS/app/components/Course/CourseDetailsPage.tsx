"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseDetails from "./CourseDetails";
import Header from "../Header";
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from "@/redux/features/orders/ordersApi";
import {loadStripe} from "@stripe/stripe-js"
type Props = {
    id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
    //console.log(id);
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    //console.log("data", data);
    const {data: config} = useGetStripePublishablekeyQuery({});
    const [createPaymenIntent,{data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=>{
        if(config){
            const publishableKey = config?.publishableKey;
            setStripePromise(loadStripe(publishableKey))
        }
        if(data){
            const amount = Math.round(data.course.price * 100);
            createPaymenIntent(amount);
        }
    },[config,data]);
    useEffect(()=>{
        if(paymentIntentData){
            setClientSecret(paymentIntentData?.clientSecret);
        }
    },[paymentIntentData])
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Heading
                        title={data?.course?.name + "- ELearning"}
                        description={
                            "Elearning is programming comminity which is developed by NAMNPHfor helping programmers"
                        }
                        keywords={data?.course?.tags}
                    />
                    <Header open={open} setOpen={setOpen} activeItem={1} route={route} setRoute={setRoute} />
                    <CourseDetails data={data.course} />
                </div>
            )}
        </>
    );
};

export default CourseDetailsPage;
