import LaborantShow from "./LaborantShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadLaborants from "./LaborantListApi";

function LaborantList() {
  const { laborants, setLaborants } = useContext(FormsContext);

  useEffect(() => {
    async function getLaborants() {
      const response = await loadLaborants();
      setLaborants(response.data);
    }
    getLaborants();
  }, [setLaborants]);

  return (
    <div className="laborant-list">
      {laborants.content.map((input, index) => {
        return <LaborantShow key={index} input={input} />;
      })}
    </div>
  );
}

export default LaborantList;
