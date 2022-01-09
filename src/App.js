import EditablePage from "./EditablePage/EditablePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1 style={{ marginLeft: "60px" }}>Notion Clone</h1>
        <EditablePage />
      </div>
    </div>
  );
}

export default App;
