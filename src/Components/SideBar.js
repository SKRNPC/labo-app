import LaborantForm from "./LaborantForm";
import { useState } from "react";
import LaborantList from "./LaborantList";
import RaporForm from "./RaporForm";

function SideBar() {
  const [laborants, setLaborants] = useState([]);
  const createLaborant = (isim, labKimlik) => {
    const createdLaborants = [
      ...laborants,
      {
        id: Math.round(Math.random() * 999999),
        isim,
        labKimlik,
      },
    ];
    setLaborants(createdLaborants);
  };
  const deleteLaborantById = (id) => {
    const afterDeletingInputs = laborants.filter((input) => {
      return input.id !== id;
    });
    setLaborants(afterDeletingInputs);
  };
  const editInputById = (id, updatedIsim, updatedKimlik) => {
    const updatedInputs = laborants.map((input) => {
      if (input.id === id) {
        return {
          id,
          isim: updatedIsim,
          labKimlik: updatedKimlik,
        };
      }
      return input;
    });
    setLaborants(updatedInputs);
  };
  const createHasta = (dosyaNo,hastaIsim,hastaKimlik,hastaTani,TaniDetay,selectedDate,selectedFile) => {
    console.log(dosyaNo,hastaIsim,hastaKimlik,hastaTani,TaniDetay,selectedDate,selectedFile)
  };

  return (
    <div className="form-div">
      <div>
        <LaborantForm onCreate={createLaborant} />
        <LaborantList
          laborants={laborants}
          onDelete={deleteLaborantById}
          onUpdate={editInputById}
        />
      </div>
      <div>
        <RaporForm onCreateHasta={createHasta}/>
      </div>
    </div>
  );
}

export default SideBar;
