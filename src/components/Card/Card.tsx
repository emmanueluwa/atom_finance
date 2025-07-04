import React from "react";
import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card = ({ companyName, ticker, price }: Props) => {
  return (
    <div className="card">
      <img
        src={
          "https://images.unsplash.com/photo-1621768216002-5ac171876625?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
        explicabo.
      </p>
    </div>
  );
};

export default Card;
