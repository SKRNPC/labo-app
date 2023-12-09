import "./App.css";
import MainFormController from "./Components/MainFormController";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Raporlama Uygulaması</p>
        </div>
      </header>
      <div className="main-div">
        <SideBar />
        <MainFormController/>
      </div>
    </div>
    
    
  );
}

export default App;
