function Square(props) {
  return (
    <div
      className="border border-dark rounded-circle Square"
      style={{ backgroundColor: props.color }}
      id={props.id}

    ></div>
  );
}
export default Square;
