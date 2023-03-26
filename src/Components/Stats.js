import Square from "./Square";

function Stats(props) {
  return (
    <div className={props.class}>
      <div id="firstStat">
        <center>
          <Square color="#36e7f4" className="statSquare"/>
            <h2>{props.counter[0]}</h2>
        </center>
      </div>
      <div  id="secondStat" >
        <center>
          <h2>{props.counter[1]}</h2>
          <Square color="#f44336" className="statSquare"/>
        </center>
      </div>
    </div>
  );
}

export default Stats;
