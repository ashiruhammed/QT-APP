import { Nunito } from "next/font/google";
import React from "react";
import { getQuestions } from "@/http";
import { getCookie } from "cookies-next";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/loader";
import { convertToArray } from "@/utils/useData";
import PreviewQuestion from "@/components/preview-question";
import TutorQuestion from "@/components/tutor-questions";
import Layout from "@/components/layout";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function Previews() {
  const token = getCookie("token");

  const { data, isLoading } = useQuery({
    queryKey: ["fetchQuestion"],
    queryFn: () => getQuestions({ token }),
  });

  const questions = data?.data ? convertToArray(data?.data) : [];

  return (
    <Layout>
      {isLoading && (
        <div>
          {Array.from({ length: 2 }).map((_, i) => (
            <Loader key={i} />
          ))}
        </div>
      )}
      <div className="max-h-[90vh] grid lg:grid-cols-2 font-sans overflow-y-auto">
        {!isLoading &&
          questions.map((question, i) => (
            <PreviewQuestion
              question={question.data.question}
              key={i}
              id={question.id}
              options={question.data.options}
            />
          ))}
        {questions.length === 0 && !isLoading && (
          <div className="fixed top-1/2 left-1/2 font-sans">
            <p>Please add a New Question</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
