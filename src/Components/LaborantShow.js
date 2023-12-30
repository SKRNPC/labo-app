import { useState } from "react";
import LaborantForm from "./LaborantForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function LaborantShow({ input }) {
  const { setLaborantUpdated,deleteLaborantById, editInputById } = useContext(FormsContext);
  
  // console.log(input.id)
  const [showEdit, setShowEdit] = useState(false);
  
  const handleEditClick = () => {
    setLaborantUpdated(true)
    setShowEdit(!showEdit);
  };
  const handleDeleteClick = () => {
    
    deleteLaborantById(input.id)
    setLaborantUpdated(false)
};
  const handleSubmit = (id, updatedIsim, updatedKimlik) => {
    setShowEdit(false);
    setLaborantUpdated(false)
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
          onDelete={handleDeleteClick}
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
