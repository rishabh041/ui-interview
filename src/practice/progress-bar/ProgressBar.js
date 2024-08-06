import { useEffect, useState } from "react";
import "./styles.css";

export default function ProgressBar(props) {
  const { onComplete, isComplete } = props;
  const [progressWidth, setProgressWidth] = useState(isComplete? 100 : 0);

  useEffect(() => {
    let interval;

    const scheduleProgressBar = () => {
      interval = setTimeout(() => {
        if(progressWidth === 100){
          clearTimeout(interval);
          onComplete();
          return;
        }
            
        setProgressWidth(prevWidth => prevWidth + 1);
      }, 100);
    }

    !isComplete && scheduleProgressBar()
  }, [progressWidth]);

  return (
    <div className="progress-bar">
      <div className="my-bar" style={{ width: `${progressWidth}%` }} />
    </div>
  );
}
