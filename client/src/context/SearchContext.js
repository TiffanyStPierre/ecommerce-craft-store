import { createContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchParams((prevParams) => ({ ...prevParams, q: value }));
    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search`, { params: searchParams });
      const newResults = response.data;

      setSearchResults(newResults);
      setInputValue("");

      if (newResults.length === 0) {
        setShowNoResults(true);
      } else {
        setShowNoResults(false);
        navigate("/products/searchresults", {
          state: { searchResults: newResults },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SearchContext.Provider
      value={{
        handleChange,
        handleSubmit,
        inputValue,
        setInputValue,
        showNoResults,
        setShowNoResults
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}