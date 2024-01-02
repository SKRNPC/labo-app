import { useState } from "react";
import RaporForm from "./RaporForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function RaporShow({ input }) {
  const {
    setRaporUpdated, // Rapor güncellendiğini ayarlayan fonksiyon
    deleteRaporById, // Raporu silen fonksiyon
    editRaporById, // Raporu güncelleyen fonksiyon
    activeRaporId, // Aktif rapor ID'si
    setActiveRaporId, // Aktif rapor ID'sini ayarlayan fonksiyon
  } = useContext(FormsContext);

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setRaporUpdated(true);
    if (activeRaporId && activeRaporId !== input.id) {
      setActiveRaporId(input.id);
      setShowEdit(true); // Bu rapor için düzenlemeyi aç
    } else if (activeRaporId === input.id) {
      setShowEdit(!showEdit); // Eğer bu rapor zaten aktifse, showEdit'i toggle edin
    } else {
      setActiveRaporId(input.id); // Bu raporı aktif düzenleme olarak ayarla
      setShowEdit(true); // Ve showEdit'i true yaparak formu açın
    }
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
       {activeRaporId === input.id && showEdit? (
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
