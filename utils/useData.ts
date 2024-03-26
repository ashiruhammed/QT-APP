export const convertToArray = (dict: GET_QUESTION) => {
  return Object.keys(dict).map((key) => ({
    id: key,
    data: dict[key],
  }));
};

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
