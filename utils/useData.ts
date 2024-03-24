export const convertToArray = (dict: GET_QUESTION) => {
  return Object.keys(dict).map((key) => ({
    id: key,
    data: dict[key],
  }));
};
