import RaporList from "./RaporList";
import RaporSirala from "./RaporSiralama";

function MainFormController() {
  return (
    <div>
      <div><RaporSirala /></div>
      <div className="rapor-div">
        <RaporList />
      </div>
    </div>
  );
}

export default MainFormController;
