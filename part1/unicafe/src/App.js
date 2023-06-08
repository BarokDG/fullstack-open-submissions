import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = (good / total) * 100 + "%";

  return (
    <>
      <h1>Give feedback</h1>

      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {total !== 0 ? average : "N/A"}</p>
      <p>positive {total !== 0 ? positive : "N/A"}</p>
    </>
  );
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

export default App;
