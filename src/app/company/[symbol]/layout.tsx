"use client";
import { CompanyProfile } from "@/app/utils/company";
import { getCompanyProfile } from "@/app/utils/services/api";
import CompanyDashboard from "@/components/CompanyDashboard/CompanyDashboard";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  const { symbol } = useParams();
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
            <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
              <Sidebar />
              <div className="flex-1">
                <CompanyDashboard company={company} />

                <div className="px-4 md:px-6 mx-auto w-full mt-6">
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div>Company not found :(</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyLayout;
