"use client";

import useRentModal from "@/app/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../ui/Heading";
import { categories } from "../shared/navbar/Categories";
import CategoryBox from "../ui/CategoryBox";
import CategoryInput from "../ui/inputs/CategoryInput";

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
                onClick = {() => {}}
                selected = {false}
                label={label}
                icon={icon}
             />
          </div>
        ))}
      </div>
    </div>
  );
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
