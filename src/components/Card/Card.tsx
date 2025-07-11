import React, { JSX, SyntheticEvent } from "react";
import "./Card.css";
import { CompanySearch } from "@/utils/company";
import AddPortfolio from "../Portfolio/AddPorfolio/AddPortfolio";
import Link from "next/link";
// import Image from "next/image";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        href={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center text-gray-900 md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>
      <p className="text-gray-900">{searchResult.currency}</p>
      <p className="font-bold text-gray-900">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
