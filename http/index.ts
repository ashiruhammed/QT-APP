import { AxiosError, AxiosResponse } from "axios";
import $http from "./xhr";
import { BaseError } from "@/types/generals";
import { CookieValueTypes } from "cookies-next";

export const getToken = async (data: GET_TOKEN_PAYLOAD) =>
  $http.post<
    AxiosError<BaseError>,
    AxiosResponse<GET_TOKEN_RESPONSE>,
    GET_TOKEN_PAYLOAD
  >("/token", data);

export const getQuestions = async ({ token }: { token: CookieValueTypes }) =>
  $http.get<AxiosError<BaseError>, AxiosResponse<GET_QUESTION>, GET_QUESTION>(
    "/questions",
    {
      headers: {
        Token: token,
      },
    }
  );

export const addQuestions = async ({
  token,
  payload,
}: {
  token: CookieValueTypes;
  payload: QUESTION;
}) =>
  $http.post<
    AxiosError<BaseError>,
    AxiosResponse<GET_TOKEN_RESPONSE>,
    QUESTION
  >("/questions", payload, {
    headers: {
      Token: token,
    },
  });

export const editQuestion = async ({
  token,
  payload,
  id,
}: {
  token: CookieValueTypes;
  payload: QUESTION;
  id: string;
}) =>
  $http.put<AxiosError<BaseError>, AxiosResponse<GET_TOKEN_RESPONSE>, QUESTION>(
    `/questions/${id}`,
    payload,
    {
      headers: {
        Token: token,
      },
    }
  );

export const deleteQuestion = async ({
  token,
  id,
}: {
  token: CookieValueTypes;
  id: string;
}) =>
  $http.delete<AxiosError<BaseError>, AxiosResponse<GET_TOKEN_RESPONSE>>(
    `/questions/${id}`,
    {
      headers: {
        Token: token,
      },
    }
  );
