import React from "react";
import SingleSearchProduct from "./../components/SingleSearchProduct";
import "./Home.css";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("name"); // استخراج پارامتر name


  return (
    <>
      <div className="new-products p10 search-cont">
        {searchQuery ? <SingleSearchProduct /> : <h1>محصولی سرچ نکردید</h1>}
      </div>
    </>
  );
};

export default Search;
