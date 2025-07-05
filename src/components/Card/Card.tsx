import React, { JSX, SyntheticEvent } from "react";
import "./Card.css";
import { CompanySearch } from "@/app/utils/company";
import AddPortfolio from "../Portfolio/AddPorfolio/AddPortfolio";
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
    <div className="card">
      {/* <Image alt={`company logo ${id}`} width="100" height="100" src={} /> */}
      <div>{`${id} company logo`}</div>
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="info">
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
