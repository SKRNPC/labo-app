import { useState } from "react";
import LaborantForm from "./LaborantForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function LaborantShow({ input }) {
  const { deleteLaborantById, editInputById } = useContext(FormsContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
   
    deleteLaborantById(input.id)
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleSubmit = (id, updatedIsim, updatedKimlik) => {
    setShowEdit(false);
    editInputById(id, updatedIsim, updatedKimlik)
    // onUpdate(id, updatedIsim, updatedKimlik);
  };

  return (
    <div>
      {showEdit ? (
        <LaborantForm
          input={input}
          laborantFormUpdate={true}
          onUpdate={handleSubmit}
        />
      ) : (
        <div className="labo-show">
          <div>
            <h3 className="isim-show">{input.isim}</h3>
            <div>
              <button className="button-sil" onClick={handleDeleteClick}>
                Sil
              </button>
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
