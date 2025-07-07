"use client";

import { FinancialEstimate } from "@/app/utils/company";
import { getFinancialEstimates } from "@/app/utils/services/api";
import Spinner from "@/components/Spinner/Spinner";
import Table from "@/components/Table/Table";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const configs = [
  { label: "Symbol", render: (estimate: FinancialEstimate) => estimate.symbol },
  { label: "Date", render: (estimate: FinancialEstimate) => estimate.date },
  {
    label: "Revenue (Low)",
    render: (estimate: FinancialEstimate) => estimate.revenueLow,
  },
  {
    label: "Revenue (High)",
    render: (estimate: FinancialEstimate) => estimate.revenueHigh,
  },
  {
    label: "Revenue (Avg)",
    render: (estimate: FinancialEstimate) => estimate.revenueAvg,
  },
  {
    label: "EBITDA (Low)",
    render: (estimate: FinancialEstimate) => estimate.ebitdaLow,
  },
  {
    label: "EBITDA (High)",
    render: (estimate: FinancialEstimate) => estimate.ebitdaHigh,
  },
  {
    label: "EBITDA (Avg)",
    render: (estimate: FinancialEstimate) => estimate.ebitdaAvg,
  },
  {
    label: "EBIT (Low)",
    render: (estimate: FinancialEstimate) => estimate.ebitLow,
  },
  {
    label: "EBIT (High)",
    render: (estimate: FinancialEstimate) => estimate.ebitHigh,
  },
  {
    label: "EBIT (Avg)",
    render: (estimate: FinancialEstimate) => estimate.ebitAvg,
  },
  {
    label: "Net Income (Low)",
    render: (estimate: FinancialEstimate) => estimate.netIncomeLow,
  },
  {
    label: "Net Income (High)",
    render: (estimate: FinancialEstimate) => estimate.netIncomeHigh,
  },
  {
    label: "Net Income (Avg)",
    render: (estimate: FinancialEstimate) => estimate.netIncomeAvg,
  },
  {
    label: "SG&A Expense (Low)",
    render: (estimate: FinancialEstimate) => estimate.sgaExpenseLow,
  },
  {
    label: "SG&A Expense (High)",
    render: (estimate: FinancialEstimate) => estimate.sgaExpenseHigh,
  },
  {
    label: "SG&A Expense (Avg)",
    render: (estimate: FinancialEstimate) => estimate.sgaExpenseAvg,
  },
  {
    label: "EPS (Low)",
    render: (estimate: FinancialEstimate) => estimate.epsLow,
  },
  {
    label: "EPS (High)",
    render: (estimate: FinancialEstimate) => estimate.epsHigh,
  },
  {
    label: "EPS (Avg)",
    render: (estimate: FinancialEstimate) => estimate.epsAvg,
  },
  {
    label: "# Revenue Analysts",
    render: (estimate: FinancialEstimate) => estimate.numAnalystsRevenue,
  },
  {
    label: "# EPS Analysts",
    render: (estimate: FinancialEstimate) => estimate.numAnalystsEps,
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
