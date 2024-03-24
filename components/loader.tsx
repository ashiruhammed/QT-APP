import React from "react";

function Loader() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-2 border rounded shadow-md animate-pulse">
        <p className="px-3 pt-4 font-semibold">Loading...</p>
        <h2 className="md:text-xl p-3 border-b bg-gray-300"></h2>
        <ul className="list-none space-y-3 mt-3 p-4">
          <li className="font-semibold bg-gray-300">&nbsp;</li>
          <li className="font-semibold bg-gray-300">&nbsp;</li>
          <li className="font-semibold bg-gray-300">&nbsp;</li>
        </ul>
        <div className="font-semibold flex gap-4 md:gap-7 p-5 justify-end">
          <button
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
            disabled>
            ...
          </button>
          <button
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
            disabled>
            ....
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loader;
