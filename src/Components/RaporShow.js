import { useState } from "react";
import RaporForm from "./RaporForm";
import { useContext } from "react";
import FormsContext from "../context/Form";

function RaporShow({ input}) {
  const { deleteRaporById, editRaporById } = useContext(FormsContext);
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
    // onDelete(input.id);
    deleteRaporById(input.id);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleSubmit = (
    id,
    updatedDosyaNo,
    updatedHastaIsim,
    updatedHastaKimlik,
    updatedHastaTani,
    updatedTaniDetay,
    updatedSelectedDate,
    updatedSelectedFile
  ) => {
    setShowEdit(false);
    // onUpdate(
    //   id,
    //   updatedDosyaNo,
    //   updatedHastaIsim,
    //   updatedHastaKimlik,
    //   updatedHastaTani,
    //   updatedTaniDetay,
    //   updatedSelectedDate,
    //   updatedSelectedFile
    // );
    editRaporById(
      id,
      updatedDosyaNo,
      updatedHastaIsim,
      updatedHastaKimlik,
      updatedHastaTani,
      updatedTaniDetay,
      updatedSelectedDate,
      updatedSelectedFile
    );
  };

  return (
    <div className="hasta-show">
      {showEdit ? (
        <RaporForm
          input={input}
          raporFormUpdate={true}
          onUpdate={handleSubmit}
        />
      ) : (
        <div>
          <h3 className="isim-show">{input.hastaIsim}</h3>
          <p className="isim-show">{input.hastaTani}</p>
          <div>
            <button className="button-sil" onClick={handleDeleteClick}>
              Sil
            </button>
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
