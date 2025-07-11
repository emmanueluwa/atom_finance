import { UserProfileToken } from "@/models/User";
import { handleError } from "@/utils/helpers/ErrorHandler";
import axios from "axios";

const api = "http://localhost:5195";

export const loginApi = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerApi = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
