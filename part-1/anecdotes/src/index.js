import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});
  const nextAnec = () => {
    let ranNum = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(ranNum);
  };

  const handleVote = () => {
    setVote({
      ...vote,
      [selected]: vote[selected] === undefined ? 1 : vote[selected] + 1,
    });
  };

  const voteCount = vote[selected] === undefined ? 0 : vote[selected];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}

      <p>has {voteCount} votes</p>

      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={nextAnec}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotes vote={vote} />
    </div>
  );
};

const MostVotes = ({ vote }) => {
  const sortedVotes = Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0];
  const mostVoted = anecdotes[sortedVotes];
  return (
    <>
      <p>{mostVoted}</p>
      <p>
        has {vote[sortedVotes] === undefined ? "no" : vote[sortedVotes]} votes
      </p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
