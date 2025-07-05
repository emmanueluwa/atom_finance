"use client";

import CardList from "@/components/CardList/CardList";
import Search from "@/components/Search/Search";
import { useState } from "react";
import { CompanySearch } from "./utils/company";
import { searchCompanies } from "./api";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);

  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      <Search onClick={onClick} search={search} handleChange={handleChange} />
      {serverError && <div>{serverError}</div>}
      <CardList searchResults={searchResults} />
    </div>
  );
}
