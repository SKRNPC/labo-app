import { useState } from "react";
import LaborantForm from "./LaborantForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function LaborantShow({ input }) {
  const { setLaborantUpdated, deleteLaborantById, editInputById } =
    useContext(FormsContext);

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setLaborantUpdated(true);
    setShowEdit(!showEdit);
  };

  const handleDeleteClick = () => {
    deleteLaborantById(input.id);
    setShowEdit(false);
  };
  const handleSubmit = (id, updatedIsim, updatedKimlik) => {
    editInputById(id, updatedIsim, updatedKimlik);
    setShowEdit(false);
  };
  const handleCloseClick = () => {
    setShowEdit(false);
  };

  return (
    <div>
      {showEdit ? (
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
                Düzenle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LaborantShow;
