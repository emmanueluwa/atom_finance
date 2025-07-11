import { CompanyTenK } from "@/utils/company";
import React from "react";

interface Props {
  tenK: CompanyTenK;
}

const TenKFinderItem = ({ tenK }: Props) => {
  const filingDate = new Date(tenK.filingDate).getFullYear();

  //use a tag to reload document
  return (
    <a
      href={tenK.finalLink}
      type="button"
      className="inline-flex items-center p-4 text-md text-white bg-yellow-300 rounded-md"
    >
      8K - {tenK.symbol} - {filingDate}
    </a>
  );
};

export default TenKFinderItem;
