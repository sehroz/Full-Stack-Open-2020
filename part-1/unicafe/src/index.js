import React, { useState } from "react";
import ReactDOM from "react-dom";

const Stats = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  const avg = (good + bad * -1) / all;
  const pos = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
      <Statistic name="avgerage" value={avg} />
      <Statistic name="pos" value={pos} />
    </>
  );
};

const Statistic = ({ name, value }) => {
  return (
    <p>
      {name} {value} {name === "pos" ? "%" : null}
    </p>
  );
};

const Button = (props) => (
  <button onClick={props.handleVote(props.name)}> {props.name}</button>
);

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
        <Button handleVote={handleVote} name="good" />
        <Button handleVote={handleVote} name="neutral" />
        <Button handleVote={handleVote} name="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Stats good={good} bad={bad} neutral={neutral} />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
