"use client";

import CardList from "@/components/CardList/CardList";
import Search from "@/components/Search/Search";
import { SyntheticEvent, useState } from "react";
import { CompanySearch } from "./utils/company";
import { searchCompanies } from "./api";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);

  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
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
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      {serverError && <div>{serverError}</div>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
}
