import CardPortfolio from "@/components/CardPortfolio/CardPortfolio";
import React, { SyntheticEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const PortfolioList = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3>My Porfolio</h3>
      <ul>
        {portfolioValues &&
          portfolioValues.map((portfolioValue) => {
            return (
              <CardPortfolio
                portfolioValue={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
                key={uuidv4()}
              />
            );
          })}
      </ul>
    </>
  );
};

export default PortfolioList;
