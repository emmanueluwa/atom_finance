"use client";

import React, { JSX, useState } from "react";

type Props = object;

const Search: React.FC<Props> = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    console.log(e);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("clicked", search);
  };

  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e)}></input>
      <button onClick={(e) => onClick(e)}>click me!</button>
    </div>
  );
};

export default Search;
