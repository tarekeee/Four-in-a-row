import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./App.scss";
import Attributes from "./Components/Attributes";
import Board from "./Components/Board";
import ScreenWarning from "./Components/ScreenWarning";
import Stats from "./Components/Stats";
import Soundtrack from "./FORAGER - FULL OST - COMPLETE SOUNDTRACK [TubeRipper.com].webm";

function App() {
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(null);
  const [counter ,setCounter] = useState([0,0])
  const [screen, setScreen] = useState(window.innerHeight <= window.innerWidth);
  const [Att, setAtt] = useState({ display: "none" });
  const getData = (winner, player) => {
    if (winner !== "No-winner yet") {
      setWinner(winner);
      setAtt({ display: "initial" });
      console.log(winner);
    } else setAtt({ display: "none" });
    setPlayer(player);
  };
  const dataRef = useRef({ player: "#36e7f4", winner: "No-winner yet" });
  useEffect(() => {
    setScreen(window.screen.orientation.type === "landscape-primary" || window.screen.orientation.type === "landscape-secondary");
    // if (dataRef.current.winner !== "No-winner yet") {
    //   setWinner(dataRef.current.winner);
    //   setAtt({ display: "initial" });
    // } else setAtt({ display: "none" });
    // setPlayer(dataRef.current.player);
    console.log("sada");
  }, [screen, winner,dataRef]);
  console.log(document.getElementById("audio"))
  if (screen) {
    setInterval(() => {if (dataRef.current.winner !== "No-winner yet") {
      document.getElementById("Attributes").style.display = "initial";
    } else {
      document.getElementById("Attributes").style.display = "none";
    }
    setPlayer(dataRef.current.player);
    setCounter(dataRef.current.counter)
  },10)
    return (
      <div
        className="App"
      >
        <center>
          <Attributes
            winner={dataRef.current.winner}
            player={dataRef.current.player}
            style={Att}
          />
        </center>
        <div className="game d-flex">
        <Stats counter={counter} class="bg-secondary Stats rounded" />
        <Board
          // getData={(winner, player) => getData(winner, player)}
          style={Att}
          ref={dataRef}
        />
        {/* <audio id="audio" loop autoplay controls playsInline muted>
          <source src={Soundtrack} type="audio/mpeg" />
          Your browser does not support the audio element.

        </audio> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ScreenWarning />
        {/* <audio id="audio" loop autoplay>
          <source src={Soundtrack} type="audio/mpeg"/>
          Your browser does not support the audio element.

        </audio> */}
      </div>
    );
  }
}

export default App;
