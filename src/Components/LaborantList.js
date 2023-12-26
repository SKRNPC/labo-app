import LaborantShow from "./LaborantShow";
import { useContext, useEffect } from "react";
import FormsContext from "../context/Form";
import loadLaborants from "../Components/Api/LaborantListApi";

function LaborantList() {
  const { laborants, setLaborants,searchedLaborants } = useContext(FormsContext);

  useEffect(() => {
    async function getLaborants() {
      const response = await loadLaborants();
      setLaborants(response.data);
    }
    getLaborants();
  }, [setLaborants]);

  return (
    <div className="laborant-list">
      {/* Eğer laborant arama sonuçları varsa, onları listele; yoksa tüm laborantları listele */}
      {searchedLaborants.length > 0
        ? searchedLaborants.map((input, index) => (
            <LaborantShow key={index} input={input} />
          ))
        : laborants.content.map((input, index) => (
            <LaborantShow key={index} input={input} />
          ))}
    </div>
  );
}

export default LaborantList;
