import { AxiosHeaderValue } from "axios";
import { CookieValueTypes } from "cookies-next";

interface BaseError {
  data: {
    message: string;
  };
}

interface Token {
  token: CookieValueTypes;
}
