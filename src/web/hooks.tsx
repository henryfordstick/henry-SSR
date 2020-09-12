import * as React from "react";

const Hooks:React.FC = ():JSX.Element=> {
  let [count,setCount] = React.useState(0);
  React.useEffect(() => {

  },[]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>{ count }</div>
    </div>
  );
};

export default Hooks;