"use client";

import CardList from "@/components/CardList/CardList";
import Search from "@/components/Search/Search";
import { SyntheticEvent, useState } from "react";
import { CompanySearch } from "./utils/company";
import { searchCompanies } from "./api";
import PortfolioList from "@/components/Portfolio/PortfolioList/PortfolioList";
import Navbar from "@/components/Navbar/Navbar";
// import Hero from "@/components/Hero/Hero";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);

  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;

    const exists = portfolioValues.find((val) => val === value);
    if (exists) return;

    //new array created for react to trigger render
    const updatedPorfolio = [...portfolioValues, value];
    setPortfolioValues(updatedPorfolio);
  };

  const onPortfolioDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const value = (target[0] as HTMLInputElement).value;

    const updatedPortfolio = portfolioValues.filter((val) => {
      return val !== value;
    });

    setPortfolioValues(updatedPortfolio);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else {
      setSearchResults(result);
      console.log("got here");
    }
    console.log("result:", result);

    console.log(e);
  };
  return (
    <div>
      <Navbar />
      {/* <Hero /> */}
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <PortfolioList
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <div>{serverError}</div>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
}
