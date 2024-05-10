import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [sumatoriaProm, setSumatoriaProm] = useState(0);
  const [promedio, setPromedio] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const goodButton = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setSumatoriaProm(sumatoriaProm + 1);
    setPromedio((sumatoriaProm + 1) / (total+1));
    setPorcentaje(((good+1) * 100) / (total+1));
  };

  const neutralButton = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setSumatoriaProm(sumatoriaProm + 0);
    setPromedio((sumatoriaProm + 0) / (total+1));
    setPorcentaje(((good + 0) * 100) / (total+1));
  };

  const badButton = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setSumatoriaProm(sumatoriaProm - 1);
    setPromedio((sumatoriaProm-1)/(total+1))
    setPorcentaje(((good+0) * 100) / (total+1));
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={goodButton}>Good</button>
      <button onClick={neutralButton}>Neutral</button>
      <button onClick={badButton}>Bad</button>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>Total actual = {total}</p>
      <p>promedio = {promedio}</p>
      <p>porcentaje positivo = {porcentaje}%</p>
    </div>
  );
};

export default App;
