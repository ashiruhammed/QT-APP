interface GET_TOKEN_PAYLOAD {
  email: string;
}

interface GET_TOKEN_RESPONSE {
  token: string;
}

interface QUESTION {
  question: string;
  options: string[];
}

type GET_QUESTION = {
  [k: string]: sendQuestion;
};
