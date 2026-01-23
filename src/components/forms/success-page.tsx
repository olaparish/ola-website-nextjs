/* eslint-disable @next/next/no-img-element */
"use client";

import Modal from "@/components/common/modal";
import { IconClose } from "@/components/icons/icon-close";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  message: string;
};
const FormSuccessPage = ({ message }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 5000);
  });
  return (
    <div>
      <Modal
        className="bg-dark-900/70"
        isOpen={isOpen}
        onClose={() => setIsOpen(true)}
      >
        <div className="h-full">
          <div className="flex justify-end pt-12 pr-12">
            <div
              className="flex justify-center items-center border-2 border-white rounded-full w-10 h-10"
              onClick={() => {
                router.back();
              }}
            >
              <IconClose className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="relative bg-secondary-900 mt-7 p-5 rounded-t-[50px] w-full h-[calc(100%_-_116px)]">
            <div className="top-1/2 left-1/2 absolute h-[calc(100%_-_137px)] -translate-1/2">
              <img
                className="w-auto object-contain"
                src="/images/mary-form-success.svg"
                alt="Blessed Virgin Mary"
              />
            </div>
            <div className="top-1/2 left-1/2 absolute flex flex-col items-center text-white -translate-1/2">
              <img
                className="size-38"
                src="/vectors/vector-checkbox-multiple-marked-outline.svg"
                alt="check mark"
              />
              <p className="mt-10 font-medium text-[32px]">
                {message || "Thank you for submitting the Form!!"}
              </p>
              <p>You will be automatically redirected in 5 seconds</p>
              <button
                className="bg-white mt-7 px-4 py-2 font-medium text-secondary-900 text-2xl cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              >
                Go Back
              </button>
            </div>
          </div>
          s
        </div>
      </Modal>
    </div>
  );
};

export default FormSuccessPage;
