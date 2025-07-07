import React from "react";
import Tile from "../Tile/Tile";
import { CompanyProfile } from "@/app/utils/company";
import TenKFinder from "../TenKFinder/TenKFinder";

interface Props {
  company: CompanyProfile;
}

const CompanyDashboard = ({ company }: Props) => {
  return (
    <div className="relative bg-blueGray-100 w-full">
      <div className="relative pt-20 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div>
            <div className="flex">
              <Tile title="Company Name" subTitle={company.companyName} />
              <Tile title="Price" subTitle={company.price.toString()} />
              <Tile title="Sector" subTitle={company.sector} />
              {/* <Tile title="DCF" subTitle={company.dcf.toString()} /> */}
              <TenKFinder symbol={company.symbol} />
            </div>{" "}
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
