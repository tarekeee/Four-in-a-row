import { useEffect, useState } from "react";
import "./App.css";
import "./App.scss";
import Attributes from "./Components/Attributes";
import Board from "./Components/Board";
import ScreenWarning from "./Components/ScreenWarning";

function App() {
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(null);
  const [screen, setScreen] = useState(window.innerHeight <= window.innerWidth);
  const [Att, setAtt] = useState({ display: "none" });
  const getData = (winner, player) => {
    if (winner !== "No-winner yet") {
      setWinner(winner);
      setAtt({ display: "initial" });
    } else setAtt({ display: "none" });
    setPlayer(player);
  };
  useEffect(() => {
    setScreen(window.innerHeight <= window.innerWidth);
    console.log(screen);
  }, [screen]);
  console.log(screen);
  if (screen) {
    return (
      <div className="App">
        <center>
          <Attributes winner={winner} player={player} style={Att} />
        </center>
        <Board
          getData={(winner, player) => getData(winner, player)}
          style={Att}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ScreenWarning />
      </div>
    );
  }
}

export default App;
