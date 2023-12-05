import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import FormsContext from "../context/Form";

function RaporForm({ input, raporFormUpdate, onUpdate }) {
  const { laborants,createRapor  } = useContext(FormsContext);

  const [dosyaNo, setDosyaNo] = useState(input ? input.dosyaNo : "");
  const [hastaIsim, setHastaIsim] = useState(input ? input.hastaIsim : "");
  const [hastaKimlik, setHastaKimlik] = useState(
    input ? input.hastaKimlik : ""
  );
  const [hastaTani, setHastaTani] = useState(input ? input.hastaTani : "");
  const [taniDetay, setTaniDetay] = useState(input ? input.taniDetay : "");
  const [selectedDate, setSelectedDate] = useState(
    input ? input.selectedDate : ""
  );
  const [selectedFile, setSelectedFile] = useState(
    input ? input.selectedFile : ""
  );
  const [selectedLaborant, setSelectedLaborant] = useState(
    input ? input.selectedLaborant : ""
  );

  const handleLaborantChange = (event) => {
    setSelectedLaborant(event.target.value);
  };

  const handleChange = (event) => {
    setDosyaNo(event.target.value);
  };
  const handleIsimChange = (event) => {
    setHastaIsim(event.target.value);
  };
  const handleHastaKimlikChange = (event) => {
    setHastaKimlik(event.target.value);
  };
  const handleTaniChange = (event) => {
    setHastaTani(event.target.value);
  };
  const handleTaniDetayChange = (event) => {
    setTaniDetay(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (raporFormUpdate) {
      onUpdate(
        input.id,
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile
      );
    } else {
      // onCreateRapor(
      //   dosyaNo,
      //   hastaIsim,
      //   hastaKimlik,
      //   hastaTani,
      //   taniDetay,
      //   selectedDate,
      //   selectedFile
      // );
      createRapor(
        selectedLaborant,
        dosyaNo,
        hastaIsim,
        hastaKimlik,
        hastaTani,
        taniDetay,
        selectedDate,
        selectedFile
      );
    }
    setSelectedLaborant("");
    setDosyaNo("");
    setHastaIsim("");
    setHastaKimlik("");
    setHastaTani("");
    setTaniDetay("");
    setSelectedDate("");
    setSelectedFile("");
  };

  return (
    <div>
      {raporFormUpdate ? (
        <div className="rapor-update">
          <h1 className="title-labo">Raporu Güncelle</h1>
          <form className="labForm">
            <label className="labo-label">Laborant Seç:</label>
            <select
              value={selectedLaborant}
              onChange={handleLaborantChange}
              className="labo-input"
            >
              <option value="" disabled>
                Laborant Seçiniz
              </option>
              {laborants.map((laborant) => (
                <option key={laborant.id} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <label className="labo-label">Dosya Numarası</label>
            <input
              value={dosyaNo}
              onChange={handleChange}
              type="number"
              className="labo-input"
            />
            <label className="labo-label">Ad Soyad</label>
            <input
              value={hastaIsim}
              onChange={handleIsimChange}
              type="text"
              className="labo-input"
            />
            <label className="labo-label">Hasta Kimlik No</label>
            <input
              value={hastaKimlik}
              onChange={handleHastaKimlikChange}
              type="number"
              className="labo-input"
            />
            <label className="labo-label">Koyulan Tanı Başlığı</label>
            <input
              value={hastaTani}
              onChange={handleTaniChange}
              type="text"
              className="labo-input"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={handleTaniDetayChange}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="labo-input"
            />
            <label className="labo-label">Rapor Fotoğrafı</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              className="labo-input"
            />
            {selectedFile && (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="input-file"
                />
              </div>
            )}
            <footer>
              <button
                className="labo-button update-button"
                onClick={handleSubmit}
              >
                Güncelle
              </button>
            </footer>
          </form>
        </div>
      ) : (
        <div className="laboCreate">
          <h1 className="title-labo">RAPOR EKLE</h1>
          <form className="labForm">
            <label className="labo-label">Laborant Seç:</label>
            <select
              value={selectedLaborant}
              onChange={handleLaborantChange}
              className="labo-input"
            >
              <option value="" disabled>
                Laborant Seçiniz
              </option>
              {laborants.map((laborant) => (
                <option key={laborant.id} value={laborant.isim}>
                  {laborant.isim}
                </option>
              ))}
            </select>
            <label className="labo-label">Dosya Numarası</label>
            <input
              value={dosyaNo}
              onChange={handleChange}
              type="number"
              className="labo-input"
            />
            <label className="labo-label">Ad Soyad</label>
            <input
              value={hastaIsim}
              onChange={handleIsimChange}
              type="text"
              className="labo-input"
            />
            <label className="labo-label">Hasta Kimlik No</label>
            <input
              value={hastaKimlik}
              onChange={handleHastaKimlikChange}
              type="number"
              className="labo-input"
            />
            <label className="labo-label">Koyulan Tanı Başlığı</label>
            <input
              value={hastaTani}
              onChange={handleTaniChange}
              type="text"
              className="labo-input"
            />
            <label className="labo-label">Tanı Detayları</label>
            <textarea
              value={taniDetay}
              onChange={handleTaniDetayChange}
              cols="30"
              rows="5"
              className="labo-input"
            ></textarea>
            <label className="labo-label">Rapor Tarihi</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="labo-input"
            />
            <label className="labo-label">Rapor Fotoğrafı</label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".jpg, .jpeg, .png"
              className="labo-input"
            />
            {selectedFile && (
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="input-file"
                />
              </div>
            )}
            <footer>
              <button className="labo-button" onClick={handleSubmit}>
                Kaydet
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}

export default RaporForm;
