import { URL } from "./url";

const postRequest = async (path, body) => {
  const res = await fetch(`${URL}/${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(body),
  });
  return res;
};
export default postRequest;
