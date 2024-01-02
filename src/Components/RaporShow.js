import { useState } from "react";
import RaporForm from "./RaporForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function RaporShow({ input }) {
  const {
    setRaporUpdated, // Rapor güncellendiğini ayarlayan fonksiyon
    deleteRaporById, // Raporu silen fonksiyon
    editRaporById, // Raporu güncelleyen fonksiyon
  } = useContext(FormsContext);

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setRaporUpdated(true);
    setShowEdit(!showEdit);
  };

  const handleDeleteClick = () => {
    deleteRaporById(input.id); // Silme fonksiyonu
    setShowEdit(!showEdit); // Düzenlemeyi kapat
  };


  const handleSubmit = (
    id,
    updatedSelectedLaborant,
    updatedDosyaNo,
    updatedHastaIsim,
    updatedHastaKimlik,
    updatedHastaTani,
    updatedTaniDetay,
    updatedSelectedDate,
    updatedSelectedFile
  ) => {
    editRaporById(
      id,
      updatedSelectedLaborant,
      updatedDosyaNo,
      updatedHastaIsim,
      updatedHastaKimlik,
      updatedHastaTani,
      updatedTaniDetay,
      updatedSelectedDate,
      updatedSelectedFile
    );
  };
  const handleCloseClick = () => {
    setShowEdit(false);
  };

  return (
    <div className="hasta-show">
       {showEdit? (
        <RaporForm
          input={input}
          raporFormUpdate={true}
          onUpdate={handleSubmit}
          onDelete={handleDeleteClick}
          onClose={handleCloseClick}
        />
      ) : (
        <div>
          <h3 className="isim-show">{input.hastaIsim}</h3>
          <p className="isim-show">
            <strong>Laborant:</strong> {input.selectedLaborant}
          </p>
          <p className="isim-show">
            <strong>Tanı:</strong> {input.hastaTani}
          </p>
          <div>
            <button className="button-guncelle" onClick={handleEditClick}>
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RaporShow;
