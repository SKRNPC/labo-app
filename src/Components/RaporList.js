import RaporShow from "./RaporShow";

function RaporList({ raporlar, onDelete, onUpdate }) {
  return (
    <div className="rapor-list">
      {raporlar.map((input, index) => {
        return (
          <RaporShow
            key={index}
            input={input}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

export default RaporList;
