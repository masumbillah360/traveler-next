"use client";

import React, { useState } from "react";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Input from "../ui/inputs/Input";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/register", data);
      toast.success("Registration successful!");
      registerModal.onClose();
    } catch (error: any) {
      console.log(error)
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome To Traveler" subtitle="Create an account!" />
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
        id="name"
        label="Name"
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
        onClick={() => signIn('google')}
        disabled={isLoading}
        outline
        icon={FcGoogle}
        label="Continue With Google"
      />
      <Button
        onClick={() => signIn('github')}
        disabled={isLoading}
        outline
        icon={AiFillGithub}
        label="Continue With Github"
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div> Already have an account? </div>
          <div
          onClick={() => {registerModal.onClose(); loginModal.onOpen()}}
           className="text-neutral-800 font-semibold cursor-pointer hover:underline">Login</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      disabled={isLoading}
      title="Register An Account"
      actionLabel="Submit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerModal.onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
