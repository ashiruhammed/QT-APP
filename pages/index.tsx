import React from "react";
import { getQuestions } from "@/http";
import { getCookie } from "cookies-next";
import TutorQuestion from "@/components/tutor-questions";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader";
import { convertToArray } from "@/utils/useData";
import Layout from "@/components/layout";

export default function Home() {
  const token = getCookie("token");

  const { data, isLoading } = useQuery({
    queryKey: ["fetchQuestion"],
    queryFn: () => getQuestions({ token }),
    gcTime: 20000,
  });

  const questions = data?.data
    ? convertToArray(data?.data)
    : convertToArray({
        "1a903aa0-be31-441f-af5b-1505c89b692f": {
          question: "how'd today?",
          options: [
            "You can't edit this question",
            "Add your own to be able to edit and delete",
            "Just for description  purposes",
          ],
        },
        "3d88433c-1b06-4a95-85b1-d5ade70fab1e": {
          question: "How's the weather?",
          options: [
            "Kinldy adhere?",
            "It has an invalid id",
            "It is a dummy data",
          ],
        },
      });

  return (
    <Layout>
      {isLoading && (
        <div>
          {Array.from({ length: 2 }).map((_, i) => (
            <Loader key={i} />
          ))}
        </div>
      )}
      <div className="max-h-[90vh] font-sans lg:grid grid-cols-2 overflow-y-auto relative">
        {!isLoading &&
          questions.map((question, i) => (
            <TutorQuestion
              question={question.data.question}
              key={i}
              no={i}
              id={question.id}
              options={question.data.options}
            />
          ))}
        {questions.length === 0 && isLoading && (
          <div className="fixed top-1/2 left-1/2">
            <p>Please add a New Question</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
