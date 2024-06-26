"use client";

import Modal from "./Modal";
import Heading from "../ui/Heading";
import React, { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal";
import CategoryInput from "../ui/inputs/CategoryInput";
import { categories } from "../shared/navbar/Categories";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../ui/inputs/CountrySelect";
import Map from "../ui/Map";
import dynamic from "next/dynamic";
import Counter from "../ui/Counter";
import ImageUpload from "../ui/inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathRoomCount = watch("bathRoomCount");
  const imageSrc = watch("imageSrc");
  const price = watch("price");
  const title = watch("title");
  const description = watch("description");

  const Map = useMemo(() => dynamic(() => import('../ui/Map'), {
    ssr: false,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon, description }) => (
          <div key={label + "Mod"} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guest to find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics info about your place"
          subtitle="What amenities do you offer?"
        />
        <Counter
          title="Guests"
          subTitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subTitle="How many rooms ddo you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathroom"
          subTitle="How many bathrooms do you have?"
          value={bathRoomCount}
          onChange={(value) => setCustomValue("bathRoomCount", value)}
        />
      </div>
    );
  }

  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Help guests to get a better view!"
        />
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Traveler Your Home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={bodyContent}
    />
  );
};

export default RentModal;
