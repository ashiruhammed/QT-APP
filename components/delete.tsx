import { Dialog, Transition } from "@headlessui/react";
import { Nunito } from "next/font/google";
import React, { Fragment, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "@/http";
import { CookieValueTypes, getCookie } from "cookies-next";
import toast from "react-hot-toast";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function DeleteQuestion({ id }: { id: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = getCookie("token");

  const { mutate, data, isPending } = useMutation({
    mutationFn: deleteQuestion,
    onError: (error) => {
      toast.error("Check your internet connection", {
        position: "top-center",
        className: "h-12",
      });
    },
    onSuccess(data) {
      setIsOpen(false);

      queryClient.invalidateQueries({ queryKey: ["fetchQuestion"] });
      toast.success("Question successfully deleted", {
        position: "top-center",
        className: "bg-green-300 h-12",
      });
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      mutate({
        id: id,
        token: token,
      });
    },
    [mutate, id, token]
  );

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="md:w-full ml-auto py-1 gap-2 md:py-3 rounded-3xl font-sans px-4  md:text-base text-sm">
          Delete Question
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center -mt-8 justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel
                  className={`w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${nunito.variable} font-sans`}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-gray-900 border-b border-gray-200 pb-4 mb-4 font-semibold">
                    Delete Question
                  </Dialog.Title>
                  <div>
                    <p>Are you sure you want to delete this question</p>
                  </div>
                  <div className="mt-4 space-x-4 flex justify-end font-semibold">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="px-8 py-3 rounded-lg bg-primary-bg border disabled:cursor-not-allowed disabled:opacity-40">
                      {isPending ? "Deleting" : "Delete"}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      type="button"
                      className="px-6 py-4 rounded-lg bg-white">
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
