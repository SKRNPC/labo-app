function Input(props) {
    const {ad, label, error, onChange, turu,disabled}=props
   
  return (
    <>
      <label className="labo-label">{label}</label>
      <input
        value={ad}
        onChange={onChange}
        type={turu}
        className="labo-input"
        disabled={disabled}
      />
      <div className="hata-mesaj">{error}</div>
    </>
  );
}

export default Input;
