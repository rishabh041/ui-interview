import { useState, useEffect } from "react";
import "./styles.css";

import ProgressBar from "./ProgressBar";

const MAX_ACTIVE = 3;
export default function App() {
  const [progressBars, setProgressBars] = useState([]);
  const [queue, setQueue] = useState(0);
  const [activeBars, setActiveBars] = useState(0);

  useEffect(() => {
    if (queue > 0 && activeBars < MAX_ACTIVE) {
      setQueue((prev) => prev - 1);
      setProgressBars((prevBars) => [...prevBars, { isComplete: false }]);
      setActiveBars((prevActive) => prevActive + 1);
    }
  }, [queue, activeBars]);

  const handleProgressBarAdd = () => {
    setQueue((prev) => prev + 1);
  };

  const handleComplete = (index) => {
    const currProgressBars = [...progressBars];
    currProgressBars[index].isComplete = true;
    setProgressBars(currProgressBars);
    setActiveBars(prevActive => prevActive - 1);

  }

  const renderProgressBars = () => {
    return progressBars.map((bar, index) => (
      <ProgressBar key={`pb_${index}`} onComplete={() => handleComplete(index)} isComplete={bar.isComplete} />
    ));
  };

  return (
    <div className="App">
      <button onClick={handleProgressBarAdd}>Add</button>
      {renderProgressBars()}
    </div>
  );
}
