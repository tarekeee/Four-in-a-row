import Square from "./Square";

function Attributes(props) {
    
  return (
    <div id="Attributes" style={props.style} className="bg-secondary">
        <p id="att">{props.winner === "#60a569" ? "First player wins" : "Second player wins"} <br /> click the reset button </p>
    </div>
  );
}
export default Attributes;
