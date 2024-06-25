"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import toast from "react-hot-toast";
// import {authenticate} from "@/app/actions/signIn"
import Modal from "./Modal";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Input from "../ui/inputs/Input";
import { signIn } from "next-auth/react";



const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email)
    formData.append("password", data.password)
    try {
      // await authenticate(formData);
      signIn('credentials', {...data, redirect: false}).then((cb) => {
        if(cb?.ok) {
          toast.success("Login successful!");
          // router.refresh();
          loginModal.onClose();
        } if(cb?.error) {
          toast.error(cb.error)
        }
      });
    } catch (error: any) {
      console.log(error)
      setIsLoading(false);
      toast.error("Failed to login!");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back Traveler" subtitle="Book & Enjoy Life!" />
      <Input
        required
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        required
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        onClick={() => {}}
        disabled={isLoading}
        outline
        icon={FcGoogle}
        label="Continue With Google"
      />
      <Button
        onClick={() => {}}
        disabled={isLoading}
        outline
        icon={AiFillGithub}
        label="Continue With Github"
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div> Do not have any account? </div>
          <div
            onClick={() => {
              loginModal.onClose();
              registerModal.onOpen();
            }}
            className="text-neutral-800 font-semibold cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      title="Login To Your Account"
      actionLabel="Login"
      onSubmit={handleSubmit(onSubmit)}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
