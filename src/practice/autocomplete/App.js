import { useCallback, useEffect, useState } from "react";

const apiUrl = "https://dummyjson.com/users";

export default function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const debounce = useCallback((fn, delay) => {
    let timer;

    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);

      let res = await fetch(apiUrl);
      res = (await res.json()).users;
  
      res = res.filter((suggestionsMap) =>{
          const name = suggestionsMap.firstName;
         return name.toLowerCase().includes(inputSearch.toLowerCase())
        }
      );

      setIsLoading(false);
      setSuggestions(res);
    };

    const debounceWrapper = debounce(fetchSuggestions, 3000);

    if(inputSearch)
        debounceWrapper();
    else
      setSuggestions([]);


    return () => {
      clearTimeout(fetchSuggestions);
    };
  },[inputSearch, debounce])

  const handleInputChange = (e) => {
    console.log(e);
    const inputText = e.target.value;
    setInputSearch(inputText);
  };

  const renderSuggestions = () => {

    return suggestions.map((value, index) => {
      const handleSuggestionClick = () => {
        setSuggestions([]);
        setInputSearch(value.firstName);
      };

      return <li key={index} onClick={handleSuggestionClick}>{value.firstName}</li>;
    });
  };

  return (
    <div className="autoCompleteWrapper">
      <input type="text" onKeyDown={handleInputChange} value={inputSearch} />
      {isLoading ? <div>Loading...</div> : <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
