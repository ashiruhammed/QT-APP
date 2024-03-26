import React from "react";
import EditQuestion from "./edit-question";
import DeleteQuestion from "./delete";
import { nunito } from "@/utils/font";

function TutorQuestion({
  question,
  options,
  id,
  no,
}: {
  question: string;
  id: string;
  no: number;
  options: string[];
}) {
  return (
    <div
      data-testid="question"
      className={`container mx-auto p-4 md:p-5 max-h-[400px] ${nunito.variable} font-sans`}>
      <div
        tabIndex={-1}
        aria-label="question container"
        className="border rounded p-2 md:p-4 shadow-md h-full grid grid-rows-[auto_auto_auto]">
        <div>
          <p className="px-3 pt-4 font-semibold">Question:</p>
          <h2
            tabIndex={0}
            className="md:text-xl p-3 border-b font-bold"
            aria-label={`Question ${++no} ${question}`}>
            {question}
          </h2>
        </div>
        <ul className="list-none space-y-3 mt-3 p-4">
          {options.map((opt, i) => (
            <li
              aria-label={`Option ${++i} ${opt}`}
              tabIndex={0}
              key={i}
              className="font-semibold">
              <span>{String.fromCharCode(i++ + 96)}.</span> {opt}
            </li>
          ))}
        </ul>
        <div className="font-semibold flex gap-4 md:gap-7 place-self-end">
          <EditQuestion id={id} question={question} options={options} />
          <DeleteQuestion id={id} />
        </div>
      </div>
    </div>
  );
}

export default TutorQuestion;
