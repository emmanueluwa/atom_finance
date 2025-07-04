import axios from "axios";
import { CompanySearch } from "./utils/company";
import { isAxiosError } from "axios";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  console.log(query);
  try {
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=${process.env.FMP_API_KEY}`
    );

    return data;
  } catch (error) {
    if (error instanceof isAxiosError) {
      console.log("error message: ", error);
      return error;
    } else {
      console.log("unexpected error: ", error);
      return "Unexpected error occured";
    }
  }
};
