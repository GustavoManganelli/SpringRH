import { useState } from "react";
import { Header, type PageTab } from "./components/Header";
import { CandidatosPage } from "./pages/CandidatosPage";
import { FuncionariosPage } from "./pages/FuncionariosPage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<PageTab>("candidatos");

  return (
    <div className="app-container">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "candidatos" ? <CandidatosPage /> : <FuncionariosPage />}
    </div>
  );
}

export default App;
