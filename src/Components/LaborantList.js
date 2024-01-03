import LaborantShow from "./LaborantShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadLaborants from "../Components/Api/LaborantListApi";

function LaborantList() {
  const {
    laborants,
    setLaborants,
    searchedLaborants,
    laborantUpdated,
    setLaborantUpdated,
  } = useContext(FormsContext);

  useEffect(() => {
    async function getLaborants() {
      try {
        const response = await loadLaborants();
        console.log(laborantUpdated);
        setLaborants(response.data);
      } catch (error) {
        console.error("Laborant loading failed:", error);
      }
    }
    getLaborants();
  }, [setLaborantUpdated]);
  const displayedLaborants =
    searchedLaborants.length > 0 ? searchedLaborants : laborants.content;

  return (
    <div className="laborant-list">
      {displayedLaborants.map((input, index) => (
        <LaborantShow key={index} input={input} />
      ))}
    </div>
  );
}

export default LaborantList;
