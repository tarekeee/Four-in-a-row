import BoardCol from "./BoardCol";
import { forwardRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Square from "./Square";
let firstPlayer = "#36e7f4";
let secondPlayer = "#f44336";
let noOne = "#efefee";
var timer;
const Board = forwardRef((props, ref) => {
  const Cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [player, setplayer] = useState(firstPlayer);
  const [winnerCor, setWinnerCor] = useState([null, null, null, null]);
  const [counter,setCounter] = useState([0,0]);
  const initial = () => {
    let temp = [];
    let ttemp = [];
    for (let index = 0; index < 54; index++) {
      ttemp.push({ Square: index, state: noOne });
      if ((index + 1) % 6 === 0) {
        temp.push(ttemp);
        ttemp = [];
      }
    }
    return temp;
  };
  const [game, setGame] = useState(true);
  const [BoardHandler, setBoardHandler] = useState(() => {
    let temp = [];
    let ttemp = [];
    for (let index = 0; index < 54; index++) {
      ttemp.push({ Square: index, state: noOne });
      if ((index + 1) % 6 === 0) {
        temp.push(ttemp);
        ttemp = [];
      }
    }
    return temp;
  });
  const handlClick = (row) => {
    if (game && BoardHandler[row][0].state === noOne) {
      let i;
      for (i = 5; i > -1 && BoardHandler[row][i].state !== noOne; i--) {}
      let temp = player;
      setplayer(player === firstPlayer ? secondPlayer : firstPlayer);
      setBoardHandler((prev) =>
        prev.map((data, index) =>
          index === row
            ? data.map((col, count) =>
                count === i ? { Square: col.Square, state: temp } : col
              )
            : data
        )
      );
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          window.navigator.userAgent
        )
      ) {
        const BoardCol = document.querySelector(".Board-Col");
        BoardCol.style.setProperty("--current-player", player);
        const beforeSelectorRule =
          "#Col" +
          row.toString() +
          "::before {display : none; background-color:" +
          temp +
          ";}";
        var styleSheet = document.styleSheets[0];
        styleSheet.insertRule(beforeSelectorRule, styleSheet.cssRules.length);
        // User is using a mobile device
        timer = setTimeout(() => {
          const BoardCol = document.querySelector(".Board-Col");
          BoardCol.style.setProperty("--current-player", player);
          const beforeSelectorRule =
            "#Col" +
            row.toString() +
            "::before {display : initial; background-color:" +
            (player === firstPlayer ? secondPlayer : firstPlayer) +
            ";}";
          var styleSheet = document.styleSheets[0];
          styleSheet.insertRule(beforeSelectorRule, styleSheet.cssRules.length);
        }, 200);
      }
    }
  };
  const handleHoverEnter = (col) => {
    console.log("#Col" + col.toString() + "::before");
    if (
      BoardHandler[col][0].state === noOne &&
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        window.navigator.userAgent
      )
    ) {
      const beforeSelectorRule =
        "#Col" +
        col.toString() +
        "::before {display : initial; background-color:" +
        player +
        ";}";
      var styleSheet = document.styleSheets[0];
      styleSheet.insertRule(beforeSelectorRule, styleSheet.cssRules.length);
    }
  };
  const handleHoverLeave = (col) => {
    clearTimeout(timer);
    console.log("#Col" + col.toString() + "::before");
    const beforeSelectorRule =
      "#Col" +
      col.toString() +
      "::before {display : none; background-color:" +
      player +
      ";}";
    var styleSheet = document.styleSheets[0];
    styleSheet.insertRule(beforeSelectorRule, styleSheet.cssRules.length);
    if (claculateWinner(BoardHandler) !== "No-winner yet") {
      document.getElementById("Square" + winnerCor[0]).style.backgroundColor =
        "#e0ba4e";
      document.getElementById("Square" + winnerCor[1]).style.backgroundColor =
        "#e0ba4e";
      document.getElementById("Square" + winnerCor[2]).style.backgroundColor =
        "#e0ba4e";
      document.getElementById("Square" + winnerCor[3]).style.backgroundColor =
        "#e0ba4e";
    }
  };

  useEffect(() => {
    claculateWinner(BoardHandler) !== "No-winner yet"
      ? setGame(false)
      : setGame(true);
    ref.current = { player: player, winner: claculateWinner(BoardHandler) ,counter : counter};
  }, [BoardHandler, ref, player,counter]);
  function claculateWinner(Board) {
    for (let i = 0; i < Board.length; i++) {
      for (let j = 0; j < Board[i].length; j++) {
        const temp = Board[i][j].state;
        if (temp !== noOne) {
          if (
            j + 3 < Board[i].length &&
            [
              Board[i][j].state,
              Board[i][j + 1].state,
              Board[i][j + 2].state,
              Board[i][j + 3].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i][j + 1].Square,
              Board[i][j + 2].Square,
              Board[i][j + 3].Square,
            ]);
            return temp;
          }
          if (
            i + 3 < Board.length &&
            [
              Board[i][j].state,
              Board[i + 1][j].state,
              Board[i + 2][j].state,
              Board[i + 3][j].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i + 1][j].Square,
              Board[i + 2][j].Square,
              Board[i + 3][j].Square,
            ]);
            return temp;
          }
          if (
            i + 3 < Board.length &&
            j + 3 < Board[i].length &&
            [
              Board[i][j].state,
              Board[i + 1][j + 1].state,
              Board[i + 2][j + 2].state,
              Board[i + 3][j + 3].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i + 1][j + 1].Square,
              Board[i + 2][j + 2].Square,
              Board[i + 3][j + 3].Square,
            ]);
            return temp;
          }
          if (
            i - 3 >= 0 &&
            j - 3 >= 0 &&
            [
              Board[i][j].state,
              Board[i - 1][j - 1].state,
              Board[i - 2][j - 2].state,
              Board[i - 3][j - 3].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i - 1][j - 1].Square,
              Board[i - 2][j - 2].Square,
              Board[i - 3][j - 3].Square,
            ]);
            return temp;
          }
          if (
            i + 3 < Board.length &&
            j - 3 >= 0 &&
            [
              Board[i][j].state,
              Board[i + 1][j - 1].state,
              Board[i + 2][j - 2].state,
              Board[i + 3][j - 3].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i + 1][j - 1].Square,
              Board[i + 2][j - 2].Square,
              Board[i + 3][j - 3].Square,
            ]);
            return temp;
          }
          if (
            i - 3 >= 0 &&
            j + 3 < Board[i].length &&
            [
              Board[i][j].state,
              Board[i - 1][j + 1].state,
              Board[i - 2][j + 2].state,
              Board[i - 3][j + 3].state,
            ].toString() === [temp, temp, temp, temp].toString()
          ) {
            setWinnerCor([
              Board[i][j].Square,
              Board[i - 1][j + 1].Square,
              Board[i - 2][j + 2].Square,
              Board[i - 3][j + 3].Square,
            ]);
            return temp;
          }
        }
      }
    }
    return "No-winner yet";
  }
  return (
    <div className="Board d-flex flex-column  rounded">
      <div
        className="d-flex flex-row gap-1 border-secondary rounded bg-secondary"
        style={{ display: "none", padding : "10px" }}
      >
        {Cols.map((data, index) => (
          <BoardCol
            number={data}
            key={data}
            status={BoardHandler[index]}
            onClick={(data) => handlClick(data)}
            onMouseEnter={(data) => handleHoverEnter(data)}
            onMouseLeave={(data) => handleHoverLeave(data)}
          />
        ))}
      </div>
      <div id="misc" className="">
        <Button
          className="Reset"
          variant="secondary"
          size="sm"
          onClick={() => {
            setBoardHandler(initial);
            setWinnerCor([null, null, null, null]);
            if (claculateWinner(BoardHandler) !== "No-winner yet") {
              player !== "#36e7f4"
              ? setCounter([counter[0]+1,counter[1]])
              : setCounter([counter[0],counter[1]+1]);
            }
            console.log(counter);
          }}
        >
          <span id="ResetT">Reset</span>
        </Button>
        <Square color={player} id="current" />
      </div>
    </div>
  );
});
export default Board;
