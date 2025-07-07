// import RatioList from "@/components/RatioList/RatioList";
import Table from "@/components/Table/Table";
import React from "react";
// import { CompanyKeyMetrics } from "../utils/company";
// import { testIncomeStatementData } from "@/components/Table/testData";

// const tableConfig = [
//   {
//     label: "Market Cap",
//     render: (company: CompanyKeyMetrics) => company.marketCapTTM,
//     subTitle: "Total value of all a company's shares of stock",
//   },
// ];

const Page = () => {
  return (
    <>
      <h1>Atom Finance Design Guide</h1>
      {/* <RatioList data={testIncomeStatementData} config={tableConfig} /> */}
      <Table />
      <h2>
        This the design page. This is where all the design aspects of the app
        can be found.
      </h2>
    </>
  );
};

export default Page;
