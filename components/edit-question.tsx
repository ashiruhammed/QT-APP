import { Dialog, Transition } from "@headlessui/react";
import { Nunito } from "next/font/google";
import React, { Fragment, useState } from "react";
import Option from "./option";
import AddNewOption from "./add-new-option";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editQuestion } from "@/http";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function EditQuestion({
  question,
  options,
  id,
}: {
  question: string;
  id: string;
  options: string[];
}) {
  let [isOpen, setIsOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<string>(question);

  const [editedOption, setEditedOptions] = useState<Array<string>>(options);

  function removeOption(id: number) {
    setEditedOptions((option) => option.filter((opt, i) => i !== id));
  }

  const token = getCookie("token");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editQuestion,
    onError: (error) => {
      toast.error("Check your internet connection", {
        position: "top-center",
        className: "h-12",
      });
    },
    onSuccess(data) {
      setIsOpen(false);
      setEditedQuestion("");
      queryClient.invalidateQueries({ queryKey: ["fetchQuestion"] });

      toast.success("Question successfully edited", {
        position: "top-center",
        className: "bg-green-300 h-12",
      });
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate({
        token: token,
        payload: {
          question: editedQuestion,
          options: editedOption,
        },
        id: id,
      });
    },
    [editedOption, mutate, id, token, editedQuestion]
  );

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="md:w-full ml-auto py-1 gap-2 md:py-3 rounded-3xl font-sans px-4 text-sm md:text-base">
          Edit Question
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
                    Edit Question
                  </Dialog.Title>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <label htmlFor="editedQuestion" className="font-semibold">
                        Question:
                      </label>
                      <textarea
                        placeholder="Type your question here"
                        id="editedQuestion"
                        name="editedQuestion"
                        onChange={(e) => {
                          setEditedQuestion(e.target.value);
                        }}
                        defaultValue={question}
                        className="w-full outline-none p-4 border rounded-md"
                        rows={2}></textarea>
                    </div>

                    <ul className="space-y-4">
                      {editedOption.map((opt, i) => (
                        <Option
                          key={i}
                          opt={opt}
                          id={i}
                          removeOption={removeOption}
                        />
                      ))}
                    </ul>
                    {editedOption.length < 5 && (
                      <AddNewOption
                        getOption={(opt) => {
                          setEditedOptions([...editedOption, opt]);
                        }}
                      />
                    )}
                    <div className="mt-4 space-x-4 flex justify-end font-semibold">
                      <button
                        type="submit"
                        disabled={
                          !editedOption.length ||
                          editedOption.length < 3 ||
                          editedOption.length > 5 ||
                          !editedQuestion
                        }
                        className="px-8 py-3 rounded-lg bg-primary-bg border disabled:cursor-not-allowed disabled:opacity-40">
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-6 py-4 rounded-lg bg-white"
                        onClick={() => setIsOpen(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
