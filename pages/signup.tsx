import { Nunito } from "next/font/google";
import React from "react";
import { getToken } from "@/http";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { BaseError } from "@/types/generals";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

function Signup() {
  const [formValues, setFormValues] = React.useState({
    email: "",
  });
  const router = useRouter();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const { mutate, data, isPending } = useMutation({
    mutationFn: getToken,
    onError: (error: AxiosError<BaseError>) => {
      if (error.response?.status === 400) {
        toast.error("Please provide a valid email address");
      } else {
        toast.error("An error occurred, please try again");
      }
    },
    onSuccess(data) {
      setCookie("token", data.data.token);
      router.push("/");
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(formValues);
    },
    [formValues, mutate]
  );

  return (
    <div
      className={`bg-primary h-screen flex items-center px-6 justify-center ${nunito.variable} font-sans`}>
      <div className="mt-16">
        <h1
          tabIndex={0}
          aria-live="off"
          className="text-primary-lemon font-sans text-xl outline-none font-semibold md:text-2xl text-balance">
          Create your account and start using QT
        </h1>
        <form
          className="shadow-md rounded-md mt-8 space-y-4"
          onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Input your email address"
            className="px-4 py-4 rounded-md border border-white caret-white text-white bg-transparent w-full peer"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <button
            type="submit"
            tabIndex={0}
            aria-live="off"
            disabled={formValues.email ? false : true}
            className="px-8 py-3 border border-white rounded-md font-semibold bg-white ml-auto peer-invalid:cursor-not">
            {isPending ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
