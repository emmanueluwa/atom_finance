"use client";
import { CompanyCashFlowAsReported } from "@/utils/company";
import { getCashflowStatement } from "@/utils/services/api";
import Spinner from "@/components/Spinner/Spinner";
import Table from "@/components/Table/Table";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const config = [
  {
    label: "Cash & Cash Equivalents",
    render: (company: CompanyCashFlowAsReported) =>
      company.data
        .cashcashequivalentsrestrictedcashandrestrictedcashequivalentsincludingdisposalgroupanddiscontinuedoperations,
  },
  {
    label: "Net Income",
    render: (company: CompanyCashFlowAsReported) => company.data.profitloss,
  },
  {
    label: "Depreciation & Amortization",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.depreciationamortizationandimpairment,
  },
  {
    label: "Share-Based Compensation",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.sharebasedcompensation,
  },
  {
    label: "Inventory Write-Down",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.inventorywritedown,
  },
  {
    label: "Foreign Currency Gain/Loss",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.foreigncurrencytransactiongainlossunrealized,
  },
  {
    label: "Deferred Income Tax",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.deferredincometaxexpensebenefit,
  },
  {
    label: "Non-Cash Interest & Other Operating",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.noncashinterestincomeexpenseandotheroperatingactivities,
  },
  {
    label: "Gain/Loss on Digital Assets",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.gainlossondigitalassets,
  },
  {
    label: "Change in Accounts Receivable",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseinaccountsreceivable,
  },
  {
    label: "Change in Inventories",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseininventories,
  },
  {
    label: "Change in Operating Lease Vehicles",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseinoperatingleasevehicles,
  },
  {
    label: "Change in Prepaid & Other Assets",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseinprepaiddeferredexpenseandotherassets,
  },
  {
    label: "Change in Accounts Payable & Accrued",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseinaccountspayableandaccruedliabilities,
  },
  {
    label: "Change in Contract Liabilities",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.increasedecreaseincontractwithcustomerliability,
  },
  {
    label: "Net Cash from Operating Activities",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.netcashprovidedbyusedinoperatingactivities,
  },
  {
    label: "Capital Expenditures",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentstoacquirepropertyplantandequipment,
  },
  {
    label: "Solar Energy Systems",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentsforsolarenergysystemsnetofsales,
  },
  {
    label: "Investment Purchases",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentstoacquireinvestments,
  },
  {
    label: "Proceeds from Investment Sales",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.proceedsfromsalematurityandcollectionsofinvestments,
  },
  {
    label: "Proceeds from Short-Term Investments",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.proceedsfromsaleofshortterminvestments,
  },
  {
    label: "Net Cash from Investing Activities",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.netcashprovidedbyusedininvestingactivities,
  },
  {
    label: "Debt Issuance Proceeds",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.proceedsfromissuanceofdebt,
  },
  {
    label: "Convertible Debt Repayments",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.repaymentsofconvertibledebt,
  },
  {
    label: "Share Issuance Proceeds",
    render: (company: CompanyCashFlowAsReported) =>
      company.data
        .proceedsfromissuanceofsharesunderincentiveandsharebasedcompensationplansincludingstockoptions,
  },
  {
    label: "Finance Lease Payments",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.financeleaseprincipalpayments,
  },
  {
    label: "Debt Issuance Costs",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentsofdebtissuancecosts,
  },
  {
    label: "Payments to Minority Shareholders",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentstominorityshareholders,
  },
  {
    label: "Buyouts of Non-Controlling Interests",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.paymentsforbuyoutsofnoncontrollinginterestsinsubsidiaries,
  },
  {
    label: "Net Cash from Financing Activities",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.netcashprovidedbyusedinfinancingactivities,
  },
  {
    label: "Exchange Rate Effect",
    render: (company: CompanyCashFlowAsReported) =>
      company.data
        .effectofexchangerateoncashcashequivalentsrestrictedcashandrestrictedcashequivalentsincludingdisposalgroupanddiscontinuedoperations,
  },
  {
    label: "Net Change in Cash",
    render: (company: CompanyCashFlowAsReported) =>
      company.data
        .cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect,
  },
  {
    label: "Non-Cash Acquisition Value",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.noncashorpartnoncashacquisitionvalueofassetsacquired1,
  },
  {
    label: "Interest Paid",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.interestpaidnet,
  },
  {
    label: "Income Taxes Paid",
    render: (company: CompanyCashFlowAsReported) =>
      company.data.incometaxespaid,
  },
];

const Page = () => {
  const { symbol } = useParams();
  const [serverError, setServerError] = useState("");

  const [cashflow, setCashflow] = useState<CompanyCashFlowAsReported[]>([]);

  useEffect(() => {
    const getCashflowInit = async () => {
      const result = await getCashflowStatement(symbol as string);

      if (typeof result === "string") {
        setServerError(result);
      } else {
        setCashflow(result!.data);
      }
    };
    getCashflowInit();
  }, []);

  if (serverError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>{cashflow ? <Table config={config} data={cashflow} /> : <Spinner />}</>
  );
};

export default Page;
