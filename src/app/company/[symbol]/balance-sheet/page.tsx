"use client";
import { CompanyBalanceSheet } from "@/utils/company";
import { formatLargeMonetaryNumber } from "@/utils/helpers/NumberFormatting";
import { getBalanceSheet } from "@/utils/services/api";
import RatioList from "@/components/RatioList/RatioList";
import Spinner from "@/components/Spinner/Spinner";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const config = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets) ?? "N/A",
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets) ?? "N/A",
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents) ?? "N/A",
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet) ?? "N/A",
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets) ?? "N/A",
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt) ?? "N/A",
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities) ?? "N/A",
  },
  {
    label: <div className="font-bold">Total Liabilites</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities) ?? "N/A",
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities) ?? "N/A",
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt) ?? "N/A",
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities) ?? "N/A",
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity) ?? "N/A",
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings) ?? "N/A",
  },
];

const Page = () => {
  const { symbol } = useParams();

  const [serverError, setServerError] = useState<string>("");

  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();

  useEffect(() => {
    const getBalanceSheetInit = async () => {
      const response = await getBalanceSheet(symbol as string);

      if (typeof response === "string") {
        setServerError(response);
      } else {
        setBalanceSheet(response?.data[0]);
      }
    };
    getBalanceSheetInit();
  }, []);

  if (serverError) {
    return <div>Something went wrong...</div>;
  }
  return (
    <>
      {balanceSheet ? (
        <RatioList config={config} data={balanceSheet} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Page;
