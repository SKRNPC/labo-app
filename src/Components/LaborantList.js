import LaborantShow from "./LaborantShow";
import { useContext, useEffect, useState } from "react";
import FormsContext from "../context/Form";
import loadLaborants from "./LaborantListApi"

function LaborantList() {
  const { laborants, setLaborants} = useContext(FormsContext);
  // const [users, setUsers] = useState([])

  useEffect(()=>{
    async function getLaborants(){
      const response = await loadLaborants();
      setLaborants(response.data);
    }
    getLaborants();
  },[setLaborants]);
  
  return (
    <div className="laborant-list">
      {laborants.map((input, index) => {
        return <LaborantShow key={index} input={input} />;
      })}
    </div>
  );
}

export default LaborantList;
