import LaborantShow from "./LaborantShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadLaborants from "../Components/Api/LaborantListApi";

function LaborantList() {
  const { laborants, setLaborants,searchedLaborants,laborantUpdated} = useContext(FormsContext);
 
  
  useEffect(() => {
    async function getLaborants() {
      
        const response = await loadLaborants();
        setLaborants(response.data);
        console.log(laborantUpdated)
    }
    getLaborants();
  },[setLaborants, laborantUpdated]);

 const displayedLaborants = searchedLaborants.length > 0 ? searchedLaborants : laborants.content;

  return (
    <div className="laborant-list">
      {displayedLaborants.map((input, index) => (
        <LaborantShow key={index} input={input} />
      ))}
    </div>
  );
}

export default LaborantList;
