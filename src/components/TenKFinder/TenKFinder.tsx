import { CompanyTenK } from "@/app/utils/company";
import { getTenK } from "@/app/utils/services/api";
import React, { useEffect, useState } from "react";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  symbol: string;
}

const TenKFinder = ({ symbol }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>([]);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const getTenKDataInit = async () => {
      const value = await getTenK(symbol as string);

      if (typeof value === "string") {
        setServerError(value);
      } else {
        setCompanyData(value?.data);
      }
    };
    getTenKDataInit();
  }, []);

  if (serverError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyData ? (
        companyData?.slice(0, 1).map((tenK) => {
          return <TenKFinderItem tenK={tenK} key={uuidv4()} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
