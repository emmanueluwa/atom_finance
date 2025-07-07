import React from "react";
import { ClipLoader } from "react-spinners";
import "./Spinner.css";

interface Props {
  isLoading?: boolean;
}

const Spinner = ({ isLoading = true }: Props) => {
  return (
    <>
      <div id="loading-spinner">
        <ClipLoader
          color="#FFD580"
          loading={isLoading}
          size={35}
          aria-label="loading spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Spinner;
