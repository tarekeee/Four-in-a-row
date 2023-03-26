import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Square from "./Square";

function Attributes(props) {
  const [showAttributes, setShowAttributes] = useState(true);
  function handleClick() {
    setShowAttributes(false);
    setTimeout(() => {
      setShowAttributes(true);
    }, 2500);
    console.log("asd")
  }
  if (showAttributes) {
  return (
    <div id="Attributes" className="bg-primary">
      <p id="att">
        {props.winner === "#36e7f4"
          ? "First player wins"
          : "Second player wins"}{" "}
        <br /> click the reset button{" "}
      </p>
      <Button
        style={{ marginTop: "-10px" }}
        onClick={() => handleClick()}
        variant="secondary"
      >
        See the Board
      </Button>
    </div>
  )}else {
    return (<div id="Attributes" style={{width: "0",height : "0" , border : "none"}}></div>);
  }
}
export default Attributes;
