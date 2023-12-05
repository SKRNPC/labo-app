import RaporShow from "./RaporShow";
import { useContext } from "react";
import FormsContext from "../context/Form";

function RaporList() {
  const { raporlar } = useContext(FormsContext);
  return (
    <div className="rapor-list">
      {raporlar.map((input, index) => {
        return <RaporShow key={index} input={input} />;
      })}
    </div>
  );
}

export default RaporList;
