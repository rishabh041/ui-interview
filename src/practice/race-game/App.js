import { useEffect, useState } from "react";
import "./styles.css";

const matcherString = "ab am Rishabh Agrawal!";
const MAX_ERROR_LENGTH = 5;
const n = matcherString.length;
let currIndex = 0;

export default function App() {
  const [inputText, setInputText] = useState("");
  const [successString, setSuccessString] = useState("");
  const [testString, setTestString] = useState(matcherString);

  const handleOnChange = (e) => {
    if (currIndex === n) return;
    setInputText(e.target.value);
  };

  useEffect(() => {
    console.log("success=====", successString);
    console.log("test=====", testString);
  }, [successString, testString]);

  const getTextWithColors = () => {
    let isError = false;
    let verifiedString = "";
    let updatedTestString = "";

    const textWithColors = testString.split("").map((ele, index) => {
      // console.log("currIndex===", currIndex);
      if (index < inputText.length) {
        if (inputText[index] === ele && !isError) {
          if (ele === " ") {
            setInputText("");
            verifiedString = matcherString.slice(currIndex, index + 1);
            updatedTestString = matcherString.slice(index + 1);
            console.log("success string=====", verifiedString);
            console.log("updatedTestString", updatedTestString);
            currIndex = index;
          }
          return <span className="correct-text">{ele}</span>;
        } else {
          isError = true;
          return <span className="error-text">{ele}</span>;
        }
      } else return <span>{ele}</span>;
    });

    if (verifiedString !== "") {
      setSuccessString(verifiedString);
    }
    if (updatedTestString !== "") {
      setTestString(updatedTestString);
    }

    return textWithColors;
  };

  return (
    <div className="App">
      <div className="test-string">
        <span className="correct-text">{successString}</span>
        {getTextWithColors()}
      </div>
      <input type="text" onChange={handleOnChange} value={inputText} />
    </div>
  );
}

// input box
// input string/ mqatcher string
// MAX 5
// onChange - input
// match with matcher string
// if(length === 6)
// if(match)
//resetInput
//modify matcher string css
//track using currentIndex
// onchange will stop setting state
