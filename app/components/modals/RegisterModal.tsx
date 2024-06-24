"use client";

import React, { useCallback, useState } from "react";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../ui/Heading";
import Input from "../ui/inputs/Input";

const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegisterModal();
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
      const response = await axios.post("/api/auth/register", data);
      console.log(response);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome To Traveler" subtitle="Create an account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      disabled={isLoading}
      title="Register An Account"
      actionLabel="Submit"
      onSubmit={() => handleSubmit(onSubmit)}
      onClose={onClose}
      secondaryActionLabel="Cancel"
      secondaryAction={() => {}}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
