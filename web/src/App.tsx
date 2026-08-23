import { useState } from "react";
import { Header, type PageTab } from "./components/Header";
import { CandidatosPage } from "./pages/CandidatosPage";
import { PageContainer } from "./components/PageContainer";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<PageTab>("candidatos");

  return (
    <div className="app-container">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "candidatos" ? (
        <CandidatosPage />
      ) : (
        <PageContainer
          title="Funcionários"
          subtitle="Acompanhe e gerencie o quadro de colaboradores da empresa."
        >
          <div
            className="empty-state-cell"
            style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
            }}
          >
            Página de Funcionários em desenvolvimento...
          </div>
        </PageContainer>
      )}
    </div>
  );
}

export default App;
