import React, { JSX } from "react";
import Card from "../Card/Card";

interface Props {
  placeholder: unknown;
}

const CardList: React.FC<Props> = (): JSX.Element => {
  return (
    <div>
      <Card companyName="Apple" ticker="AAPLE" price={100} />
      <Card companyName="Microsoft" ticker="MSFT" price={200} />
      <Card companyName="Tesla" ticker="TSLA" price={300} />
    </div>
  );
};

export default CardList;
