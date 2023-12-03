import { useState } from "react"
import LaborantForm from "./LaborantForm"

function LaborantShow({input, onDelete, onUpdate}) {

    const [showEdit, setShowEdit] = useState(false)
    const handleDeleteClick= () => {
        onDelete(input.id)
    }
    const handleEditClick= () => {
        setShowEdit(!showEdit)
    }
    const handleSubmit= (id, updatedIsim, updatedKimlik) => {
        setShowEdit(false)
        onUpdate(id, updatedIsim, updatedKimlik)
    }
    console.log(input)
    
    return (
        <div>
            {showEdit ? (
                <LaborantForm input={input} laborantFormUpdate={true} onUpdate={handleSubmit}/>
            ) : ( 
            <div className="labo-show">
                <div>
                <h3 className="title">Laborant Bilgileri</h3>
                <p className="isim-show">{input.isim}</p>
                <p className="isim-show">{input.labKimlik}</p>
                <div>
                    <button className="button-sil" onClick={handleDeleteClick}>Sil</button>
                    <button className="button-guncelle" onClick={handleEditClick}>Güncelle</button>
                </div>
            </div>
        </div>       
            )}
         </div> 
    );
}

export default LaborantShow;