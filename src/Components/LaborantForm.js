import { useState } from "react";
function LaborantForm({onCreate, input, laborantFormUpdate, onUpdate}) {

    const [isim, setIsim] = useState(input ? input.isim : '')
    const [labKimlik, setLabKimlik] = useState(input ? input.labKimlik : '')

    const handleChange=(event)=>{
        setIsim(event.target.value);
    }
    const handleKimlikChange=(event)=>{
        setLabKimlik(event.target.value);
    }
    
    const handleSubmit=(event)=>{
        event.preventDefault()
        if(laborantFormUpdate){
            onUpdate(input.id, isim, labKimlik)
        }
        else{
            onCreate(isim, labKimlik)
        }
        setIsim("")
        setLabKimlik("")
    }
    return ( 
    <div >
        {''}
        {laborantFormUpdate ? (
        <div className="labo-edit">
          <div className="labo-update">
            <h1 className="title-labo">Bilgileri Güncelle</h1>
              <form className="labForm">
                <label className="labo-label">Ad Soyad</label>
                <input value={isim} onChange={handleChange} type="text" className="labo-input" />
                <label className="labo-label">Hastane Kimlik No</label>
                <input value={labKimlik} onChange={handleKimlikChange} type="number" className="labo-input" />
                <footer>
                    <button onClick={handleSubmit} className="labo-button update-button">Güncelle</button>
                </footer>
              </form> 
          </div>  
        </div>
        
    ) : (
        <div className="laboCreate">
            <h1 className="title-labo">LABORANT EKLE</h1>
              <form className="labForm">
                <label className="labo-label">Ad Soyad</label>
                <input value={isim} onChange={handleChange} type="text" className="labo-input" />
                <label className="labo-label">Hastane Kimlik No</label>
                <input value={labKimlik} onChange={handleKimlikChange} type="number" className="labo-input" />
                <footer>
                    <button onClick={handleSubmit} className="labo-button">Kaydet</button>
                </footer>
              </form> 
        </div>
    )}
    </div> 
     
    );
}

export default LaborantForm;