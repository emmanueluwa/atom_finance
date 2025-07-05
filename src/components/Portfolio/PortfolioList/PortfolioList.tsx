import CardPortfolio from "@/components/CardPortfolio/CardPortfolio";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  portfolioValues: string[];
}

const PortfolioList = ({ portfolioValues }: Props) => {
  return (
    <>
      <h3>My Porfolio</h3>
      <ul>
        {portfolioValues &&
          portfolioValues.map((portfolioValue) => {
            return (
              <CardPortfolio portfolioValue={portfolioValue} key={uuidv4()} />
            );
          })}
      </ul>
    </>
  );
};

export default PortfolioList;
