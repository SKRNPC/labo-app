import LaborantForm from "./LaborantForm";
import { useState } from "react";
import LaborantList from "./LaborantList";

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

  return (
    <div>
      <LaborantForm onCreate={createLaborant} />
      <LaborantList
        laborants={laborants}
        onDelete={deleteLaborantById}
        onUpdate={editInputById}
      />
    </div>
  );
}

export default SideBar;
