import Square from "./Square";
import {useEffect, useState} from 'react'


function BoardCol(props) {
  const tracker = [0, 1, 2, 3, 4, 5];
  const [RowHanlder, setRowHanlder] = useState(props.status);
  useEffect(() => setRowHanlder(props.status),[setRowHanlder,props.status]);
  return (
    <div
      className="d-flex Board-Col flex-column gap-1"
      id={"Col" + props.number}
      onClick={() => props.onClick(props.number)}
      onMouseEnter={() => props.onMouseEnter(props.number)}
      onMouseLeave={() => props.onMouseLeave(props.number)}

    >
      {tracker.map((data) => {
        const temp = data + parseInt(props.number) * 6;
        return <Square color={RowHanlder[data].state} id={"Square" + temp} key={temp}/>;
      })}
    </div>
  );
}
export default BoardCol;
