import { nunito } from "@/utils/font";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Nav() {
  const route = useRouter();

  return (
    <nav
      className={`md:min-w-56 border border-gray-200 divide-y divide-gray-200 font-sans ${nunito.variable}`}>
      <h1 className="md:text-3xl font-bold text-xl text-center py-6 hidden md:block">
        QT
      </h1>
      <ul className="text-center text-xl font-bold divide-y divide-gray-200 hidden md:block">
        {[
          { name: "Questions", path: "/" },
          { name: "Preview", path: "/preview" },
        ].map((title, i) => (
          <li
            className={`cursor-pointer ${
              title.path === route.pathname ? "border-r-8 border-primary" : ""
            }`}
            key={i}>
            <Link className="block py-8" href={title.path}>
              {title.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
