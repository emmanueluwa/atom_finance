"use client";

import { FinancialEstimate } from "@/utils/company";
import { formatLargeNonMonetaryNumber } from "@/utils/helpers/NumberFormatting";
import { getFinancialEstimates } from "@/utils/services/api";
import Spinner from "@/components/Spinner/Spinner";
import Table from "@/components/Table/Table";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const configs = [
  {
    label: "Symbol",
    render: (estimate: FinancialEstimate) => estimate.symbol ?? "N/A",
  },
  {
    label: "Date",
    render: (estimate: FinancialEstimate) => estimate.date ?? "N/A",
  },
  {
    label: "Revenue (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.revenueLow) ?? "N/A",
  },
  {
    label: "Revenue (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.revenueHigh) ?? "N/A",
  },
  {
    label: "Revenue (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.revenueAvg) ?? "N/A",
  },
  {
    label: "EBITDA (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitdaLow) ?? "N/A",
  },
  {
    label: "EBITDA (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitdaHigh) ?? "N/A",
  },
  {
    label: "EBITDA (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitdaAvg) ?? "N/A",
  },
  {
    label: "EBIT (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitLow) ?? "N/A",
  },
  {
    label: "EBIT (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitHigh) ?? "N/A",
  },
  {
    label: "EBIT (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.ebitAvg) ?? "N/A",
  },
  {
    label: "Net Income (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.netIncomeLow) ?? "N/A",
  },
  {
    label: "Net Income (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.netIncomeHigh) ?? "N/A",
  },
  {
    label: "Net Income (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.netIncomeAvg) ?? "N/A",
  },
  {
    label: "SG&A Expense (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.sgaExpenseLow) ?? "N/A",
  },
  {
    label: "SG&A Expense (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.sgaExpenseHigh) ?? "N/A",
  },
  {
    label: "SG&A Expense (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.sgaExpenseAvg) ?? "N/A",
  },
  {
    label: "EPS (Low)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.epsLow) ?? "N/A",
  },
  {
    label: "EPS (High)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.epsHigh) ?? "N/A",
  },
  {
    label: "EPS (Avg)",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.epsAvg) ?? "N/A",
  },
  {
    label: "# Revenue Analysts",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.numAnalystsRevenue) ?? "N/A",
  },
  {
    label: "# EPS Analysts",
    render: (estimate: FinancialEstimate) =>
      formatLargeNonMonetaryNumber(estimate.numAnalystsEps) ?? "N/A",
  },
];

const Page = () => {
  const { symbol } = useParams();
  const [serverError, setServerError] = useState<string>("");

  const [incomeStatement, setIncomeStatement] = useState<FinancialEstimate[]>(
    []
  );

  useEffect(() => {
    const getIncomeStatementInit = async () => {
      const result = await getFinancialEstimates(symbol as string);

      if (typeof result === "string") {
        setServerError(result);
      } else {
        setIncomeStatement(result!.data);
      }
    };
    getIncomeStatementInit();
  }, []);

  if (serverError) {
    return <div>Something went wrong...</div>;
  }
  return (
    <div>
      {incomeStatement ? (
        <Table config={configs} data={incomeStatement} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Page;
