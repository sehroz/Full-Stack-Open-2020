import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleVote = (setVote) => () => {
    return setVote === "good"
      ? setGood(good + 1)
      : setVote === "neutral"
      ? setNeutral(neutral + 1)
      : setVote === "bad"
      ? setBad(bad + 1)
      : null;
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <button onClick={handleVote("good")}>good</button>
        <button onClick={handleVote("neutral")}>neutral</button>
        <button onClick={handleVote("bad")}>bad</button>
      </div>
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
