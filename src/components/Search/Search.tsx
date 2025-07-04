"use client";

import React, { JSX, useState } from "react";

type Props = object;

const Search: React.FC<Props> = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    console.log(e);
  };

  return (
    <div>
      <input value={search} onChange={(e) => onClick(e)}></input>
    </div>
  );
};

export default Search;
