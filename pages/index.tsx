import Image from "next/image";
import { Inter, Nunito } from "next/font/google";
import Nav from "@/components/nav";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function Home() {
  return (
    <main
      className={`md:grid grid-cols-[auto_1fr] ${nunito.variable} font-sans h-screen max-w-[1600px] mx-auto divide-x divide-x-3 divide-gray-300`}>
      <Nav />
      <div className="grid grid-rows-[auto_1fr] divide-y divide-gray-100">
        <div className="flex justify-between text-xl font-bold px-6 py-8">
          <h1>Dashboard</h1>
          <button>New Question</button>
        </div>
        <p>Hello from here</p>
      </div>
    </main>
  );
}
