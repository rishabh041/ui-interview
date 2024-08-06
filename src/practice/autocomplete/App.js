import { useEffect, useState, useCallback } from "react";

import './styles.css';

const apiUrl = "https://dummyjson.com/users";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async () => {
    let res = await fetch(apiUrl);
    res = (await res.json()).users;

    res = res.filter((suggestionsMap) => {
        const name = suggestionsMap.firstName;
       return name.toLowerCase().includes(searchText.toLowerCase())
      }
    );
    setSuggestions(res);
  }, [searchText]);


  useEffect(() => {

    let timer;

    const scheduleSearch = () => {
      timer = setTimeout(() => {
        fetchSuggestions();
      }, 2000);
    }

    searchText && scheduleSearch();

    return () => {
      clearTimeout(timer);
    };
  },[searchText, fetchSuggestions])

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if(!inputText)
      setSuggestions([]);
    setSearchText(inputText);
  };

  const renderSuggestions = () => {
    const handleSuggestionClick = (value) => {
      setSearchText(value.firstName);
      setShouldShowSuggestions(false);
    };

    return suggestions.map((value, index) => {
      // we are using onMouseDown as if we use onClick the input loses focus,
      // triggering the onBlur event which hides the suggestions before the onClick event can be registered on the list item.
      return <li key={index} onMouseDown={() => handleSuggestionClick(value)}>{value.firstName}</li>;
    });
  };

  const handleInputBlur = () => {
    setShouldShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setShouldShowSuggestions(true);
  }

  return (
    <div className="autoCompleteWrapper">
      <input
        type="text"
        onChange={handleInputChange}
        value={searchText}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
     { shouldShowSuggestions && suggestions.length > 1 && <ul>{renderSuggestions()}</ul> }
    </div>
  );
}
