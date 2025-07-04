"use client";

import CardList from "@/components/CardList/CardList";
import Search from "@/components/Search/Search";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    console.log(e);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("clicked", search, e);
  };
  return (
    <div>
      <Search onClick={onClick} search={search} handleChange={handleChange} />
      <CardList placeholder={""} />
    </div>
  );
}
