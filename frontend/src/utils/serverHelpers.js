import axios from "axios";
import { backendURL } from "./config";

export const makeUnauthenicationPOSTRequest = async (route, body) => {
  try {
    const response = await axios.post(backendURL + route, body, {
      headers: {
        "Content-Type": "application/json",  // ensures the server knows to parse the data as JSON.
      },
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error", error);
  }
};

export const makeAuthenicationPOSTRequest = async (route, body) => {
  try {
    const token = getToken();
    // console.log(token);
    const response = await axios.post(backendURL + route, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error", error);
  }
};
export const makeAuthenicationGETRequest = async (route) => {
  try {
    const token = getToken();
    // console.log(token);
    const response = await axios.get(backendURL + route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error", error);
  }
};

const getToken = () => {
  // Get all cookies
  const cookies = document.cookie;

  // Define a regex pattern to match the token
  const tokenRegex = /token=([^;]*)/;

  // Use the regex to extract the token value from the cookies
  const tokenMatch = cookies.match(tokenRegex);

  // Check if tokenMatch is not null and get the token value
  const token = tokenMatch ? tokenMatch[1] : null;

  // Now you can use the token variable to access the token value
  //   console.log(token);
  return token;
};
