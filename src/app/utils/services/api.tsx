import axios from "axios";
import { isAxiosError } from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlowAsReported,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  FinancialEstimate,
} from "../company";
import { FREE_TIER_SYMBOL_LIMIT } from "../constants";

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

    return data;
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
      return "Unexpected error occurred";
    }
  }
};

const LIMIT = 1;

export const getIncomeStatement = async (query: string) => {
  if (FREE_TIER_SYMBOL_LIMIT.includes(query.toUpperCase())) {
    try {
      const data = await axios.get<CompanyIncomeStatement[]>(
        `https://financialmodelingprep.com/stable/income-statement-ttm?symbol=${query}&limit=${LIMIT}&apikey=${FM_API_KEY}`
      );

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "Unexpected error occurred";
      }
    }
  } else {
    return "Choose From Free Tier List";
  }
};

const ESTIMATES_LIMIT = 1;

export const getFinancialEstimates = async (query: string) => {
  if (FREE_TIER_SYMBOL_LIMIT.includes(query.toUpperCase())) {
    try {
      const data = await axios.get<FinancialEstimate[]>(
        `https://financialmodelingprep.com/stable/analyst-estimates?symbol=${query}&period=annual&page=0&limit=${ESTIMATES_LIMIT}&apikey=${FM_API_KEY}`
      );

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "Unexpected error occurred";
      }
    }
  } else {
    return "Please choose from free tier list";
  }
};

const BALANCE_SHEET_LIMIT = 1;

export const getBalanceSheet = async (query: string) => {
  if (FREE_TIER_SYMBOL_LIMIT.includes(query.toUpperCase())) {
    try {
      const data = await axios.get<CompanyBalanceSheet[]>(
        `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&limit=${BALANCE_SHEET_LIMIT}&apikey=${FM_API_KEY}`
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
  } else {
    return "Please choose from free tier list";
  }
};

const CASHFLOW_LIMIT = 1;

export const getCashflowStatement = async (query: string) => {
  if (FREE_TIER_SYMBOL_LIMIT.includes(query.toUpperCase())) {
    try {
      const data = await axios.get<CompanyCashFlowAsReported[]>(`
      https://financialmodelingprep.com/stable/cash-flow-statement-as-reported?symbol=${query}&limit=${CASHFLOW_LIMIT}&apikey=${FM_API_KEY}`);

      console.log("cash flow", data);
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
  } else {
    return "Please choose from free tier list";
  }
};
