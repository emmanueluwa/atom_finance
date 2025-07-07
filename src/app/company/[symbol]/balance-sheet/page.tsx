"use client";
import { CompanyBalanceSheet } from "@/app/utils/company";
import { getBalanceSheet } from "@/app/utils/services/api";
import RatioList from "@/components/RatioList/RatioList";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const config = [
  {
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) => company.totalAssets,
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) => company.intangibleAssets,
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
  },
  {
    label: "Total Liabilites",
    render: (company: CompanyBalanceSheet) => company.totalLiabilities,
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) => company.longTermDebt,
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) => company.otherLiabilities,
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) => company.retainedEarnings,
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
        <h1>Company not found!</h1>
      )}
    </>
  );
};

export default Page;
