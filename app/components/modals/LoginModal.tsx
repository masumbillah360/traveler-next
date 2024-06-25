"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Input from "../ui/inputs/Input";


const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    reset,
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      signIn("credentials", { ...data, redirect: false }).then((cb) => {
        if (cb?.ok) {
          toast.success("Login successful!");
          loginModal.onClose();
          reset({
            email: "",
            password: "",
          });
          router.refresh();
          setIsLoading(false);
        }
        if (cb?.error) {
          toast.error(cb.error.toString());
          setIsLoading(false);
        }
      });
    } catch (error: any) {
      console.log(error);
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
        onClick={() => signIn("google")}
        disabled={isLoading}
        outline
        icon={FcGoogle}
        label="Continue With Google"
      />
      <Button
        onClick={() => signIn("github")}
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
