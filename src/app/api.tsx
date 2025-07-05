import axios from "axios";
import { isAxiosError } from "axios";
import { CompanySearch } from "./utils/company";

export const searchCompanies = async (
  query: string
): Promise<CompanySearch[] | string> => {
  try {
    const response = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "Unexpected error occurred";
    }
  }
};
