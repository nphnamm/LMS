"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/app/styles/style";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import {signIn} from  "next-auth/react";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});
const Login: FC<Props> = ({ setRoute }) => {
  const { t, i18n } = useTranslation();

  const [login, { isError, data, isSuccess, error }] = useLoginMutation();

  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async({ email, password }) => {
      const data={
        email,password
      };
      await login(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login Successfully";
      toast.success(message);
      setRoute("/");

    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess,error])
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>
        {t('login')}

      </h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          {t('email')}
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          id="email"
          onChange={handleChange}

          placeholder={`${t('email-placeholder')}`}
          className={`${errors.email && touched.email && "border-red-500"} ${styles.input
            }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`}>
            {t('password')}
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder={`${t('password-placeholder')}`}
            className={`${errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-auto"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-auto"
              size={20}
              onClick={() => setShow(false)}
            />
          )}

        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value={`${t('btn-login')}`}
            className={`${styles.button}`}
          />

        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          {t('join-with')}

        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" 
            onClick={()=> signIn("google")}
          />
          <AiFillGithub size={30} className="cursor-pointer mr-2" 
                      onClick={()=> signIn("github")}

          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          {t('not-have-account')}
          ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Signup")}
          >
            {t('btn-sign-up')}
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;