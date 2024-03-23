import { Nunito } from "next/font/google";
import React from "react";

import "@/assets/sign-in.svg";
import Image from "next/image";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
function signin() {
  return (
    <div
      className={`bg-primary h-screen flex justify-center ${nunito.variable} font-sans`}>
      <div className="mt-16">
        <h1 className="text-primary-lemon font-sans text-xl outline-none font-semibold md:text-2xl">
          Create your account and start using QT
        </h1>
        <form className="shadow-md rounded-md mt-8 space-y-4">
          <input
            type="email"
            placeholder="Input your email address"
            className="px-4 py-4 rounded-md border border-white caret-white text-white bg-transparent w-full"
          />
          <button className="px-8 py-3 border border-white rounded-md font-semibold bg-white ml-auto">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default signin;
