import LaborantShow from "./LaborantShow";
import { useContext } from "react";
import FormsContext from "../context/Form";

function LaborantList() {
  const { laborants } = useContext(FormsContext);
  
  return (
    <div className="laborant-list">
      {laborants.map((input, index) => {
        return <LaborantShow key={index} input={input} />;
      })}
    </div>
  );
}

export default LaborantList;
