import { useState } from "react";
import LaborantForm from "./LaborantForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function LaborantShow({ input }) {
  const {
    setLaborantUpdated,
    deleteLaborantById,
    editInputById,
    activeEditId,
    setActiveEditId,
  } = useContext(FormsContext);


  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setLaborantUpdated(true)
    if (activeEditId && activeEditId !== input.id) {
      setActiveEditId(input.id);
      setShowEdit(true); // Bu laborant için düzenlemeyi aç
    } 
    // Eğer bu laborant zaten aktifse, showEdit'i toggle edin
    else if (activeEditId === input.id) {
      setShowEdit(!showEdit);
    } 
    // Eğer şu anda hiçbir düzenleme aktif değilse veya bu laborant aktif değilse
    else {
      setActiveEditId(input.id); // Bu laborantı aktif düzenleme olarak ayarla
      setShowEdit(true); // Ve showEdit'i true yaparak formu açın
    }
  };

  const handleDeleteClick = () => {
    deleteLaborantById(input.id);
    setShowEdit(!showEdit);
  };
  const handleSubmit = (id, updatedIsim, updatedKimlik) => {
    editInputById(id, updatedIsim, updatedKimlik);
  };
  const handleCloseClick = () => {
    setShowEdit(false);
  };

  return (
    <div>
      {activeEditId === input.id && showEdit ? (
        // Eğer aktif edit ID bu laborant ise ve showEdit true ise formu göster
        <LaborantForm
          input={input}
          laborantFormUpdate={true}
          onUpdate={handleSubmit}
          onDelete={handleDeleteClick}
          onClose={handleCloseClick}
        />
      ) : (
        <div className="labo-show">
          <div>
            <h3 className="isim-show">{input.isim}</h3>
            <div>
              <button className="button-guncelle" onClick={handleEditClick}>
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LaborantShow;
