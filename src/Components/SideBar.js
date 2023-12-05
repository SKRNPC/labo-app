import LaborantForm from "./LaborantForm";
import LaborantList from "./LaborantList";
import SearchBar from "./SearchBar";
import RaporForm from "./RaporForm";

function SideBar() {
  return (
    <div>
      <div>
        <SearchBar />
      </div>

      <div className="sidebar-div">
        <div>
          <LaborantForm />
          <LaborantList />
        </div>
        <div>
          <RaporForm />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
