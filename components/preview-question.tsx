import React from "react";
import PreviewOptions from "./preview-options";
import { nunito } from "@/utils/font";

function PreviewQuestion({
  question,
  options,
  id,
}: {
  question: string;
  id: string;
  options: string[];
}) {
  return (
    <div className={`p-4 ${nunito.variable} font-sans max-h-[500px]`}>
      <div className="border rounded shadow-md h-full">
        <p className="px-3 pt-4 font-semibold">Question:</p>
        <h2
          className="md:text-xl p-3 border-b font-bold"
          tabIndex={0}
          aria-label={`Question: ${question}`}>
          {question}
        </h2>
        <ul className="list-none space-y-3">
          <PreviewOptions options={options} />
        </ul>
      </div>
    </div>
  );
}

export default PreviewQuestion;
