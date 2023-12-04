import { useState } from "react";
import RaporForm from "./RaporForm";
import RaporList from "./RaporList";

function MainFormController() {
  const [raporlar, setRaporlar] = useState([]);
  const createRapor = (
    dosyaNo,
    hastaIsim,
    hastaKimlik,
    hastaTani,
    TaniDetay,
    selectedDate,
    selectedFile
  ) => {
    const createdRaporlar = [
      ...raporlar,
      {
        id: Math.round(Math.random() * 999999),
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        TaniDetay,
        selectedDate,
        selectedFile,
      },
    ];
    setRaporlar(createdRaporlar);
  };
  const deleteRaporById = (id) => {
    const afterDeletingInputs = raporlar.filter((input) => {
      return input.id !== id;
    });
    setRaporlar(afterDeletingInputs);
  };
  const editRaporById = (
    id,
    updatedDosyaNo,
    updatedHastaIsim,
    updatedHastaKimlik,
    updatedHastaTani,
    updatedTaniDetay,
    updatedSelectedDate,
    updatedSelectedFile
  ) => {
    const updatedInputs = raporlar.map((input) => {
      if (input.id === id) {
        return {
          id,
          dosyaNo: updatedDosyaNo,
          hastaIsim: updatedHastaIsim,
          hastaKimlik: updatedHastaKimlik,
          hastaTani: updatedHastaTani,
          taniDetay: updatedTaniDetay,
          selectedDate: updatedSelectedDate,
          selectedFile: updatedSelectedFile,
        };
      }
      return input;
    });
    setRaporlar(updatedInputs);
  };

  return (
    <div className="rapor-div">
      <RaporForm onCreateRapor={createRapor} />
      <RaporList
        raporlar={raporlar}
        onDelete={deleteRaporById}
        onUpdate={editRaporById}
      />
    </div>
  );
}

export default MainFormController;
