"use client";
import { CompanyProfile } from "@/app/utils/company";
import { getCompanyProfile } from "@/app/utils/services/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { symbol } = useParams();
  console.log("ticker:", symbol);

  const [company, setCompany] = useState<CompanyProfile>();
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(symbol as string);

      if (typeof result === "string") {
        setServerError(result);
      } else {
        setCompany(result?.data[0]);
      }
    };
    getProfileInit();
  }, []);

  return (
    <div>
      {serverError ? (
        <div>{serverError}</div>
      ) : (
        <div>
          {company ? (
            <div>{company.companyName}</div>
          ) : (
            <div>Company not found :(</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
