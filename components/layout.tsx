import { Nunito } from "next/font/google";
import Nav from "@/components/nav";
import NewQuestion from "@/components/new-question";
import React from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      aria-label="Welcom to QT questions"
      tabIndex={0}
      className={`md:grid grid-cols-[auto_1fr] ${nunito.variable} font-sans h-screen max-w-[1600px] mx-auto`}>
      <Nav />
      <main className="grid grid-row-[auto_auto_1fr] md:grid-rows-[auto_1fr] space-y-4 md:space-y-0">
        <div className="flex justify-between text-xl font-bold px-6 border py-4 items-center">
          <h1 className="text-sm md:text-base">
            {router.pathname === "/" ? "Dashboard" : "Preview"}
          </h1>
          {router.pathname === "/" && <NewQuestion />}
        </div>
        <MobileNav />
        {children}
      </main>
      <Toaster />
    </div>
  );
}
