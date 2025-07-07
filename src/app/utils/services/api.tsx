import axios from "axios";
import { isAxiosError } from "axios";
import { CompanyKeyMetrics, CompanyProfile, CompanySearch } from "../company";

const FM_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;

export const searchCompanies = async (
  query: string
): Promise<CompanySearch[] | string> => {
  try {
    const response = await axios.get<CompanySearch[]>(
      `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${FM_API_KEY}`
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

export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${FM_API_KEY}`
    );

    console.log("company data:", data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "Unexpected error occured";
    }
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${FM_API_KEY}`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "Unexpected error occured";
    }
  }
};
