"use client";

import React, { JSX } from "react";

interface Props {
  search: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onClick,
  search,
  handleChange,
}): JSX.Element => {
  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e)}></input>
      <button onClick={(e) => onClick(e)}>click me!</button>
    </div>
  );
};

export default Search;
