"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// icons
import { IoMdClose } from "react-icons/io";

// components
import Button from "../ui/Button";

// modal props interface
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

// modal component
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(isOpen!);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
    // setShowModal(false);
    // setTimeout(() => {
    //   onClose();
    // }, 300);
  }, [disabled, secondaryAction]);
  if (!isOpen) return null;

  const handleRefClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === ref.current) {
      setShowModal(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleRefClose}
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
    >
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
        <div
          className={`translate duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* HEADER */}
            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
              <button
                type="button"
                onClick={handleClose}
                className="p-1 hover:bg-white hover:text-rose-500 transition duration-500 absolute -right-3 -top-5 rounded-full border-2 border-white hover:border-rose-500 text-white bg-rose-500 h-8 w-8 flex justify-center items-center"
              >
                <IoMdClose className="size-full" />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryActionLabel && secondaryAction && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}

                <Button
                  type="submit"
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
