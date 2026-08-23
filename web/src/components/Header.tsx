import React from 'react';

export type PageTab = 'candidatos' | 'funcionarios';

interface HeaderProps {
  activeTab?: PageTab;
  onTabChange?: (tab: PageTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'candidatos',
  onTabChange,
}) => {
  return (
    <header className="header-topbar">
      <div className="header-content">
        <div className="header-brand">
          <div className="picpay-mark">P</div>
          <span className="brand-name">PicPay</span>

          {onTabChange && (
            <nav className="header-nav">
              <button
                type="button"
                className={`nav-tab ${activeTab === 'candidatos' ? 'active' : ''}`}
                onClick={() => onTabChange('candidatos')}
              >
                Candidatos
              </button>
              <button
                type="button"
                className={`nav-tab ${activeTab === 'funcionarios' ? 'active' : ''}`}
                onClick={() => onTabChange('funcionarios')}
              >
                Funcionários
              </button>
            </nav>
          )}
        </div>

        <div className="header-user-info">
          <span className="team-name">Equipe de Pessoas</span>
          <span className="environment-tag">Ambiente interno</span>
        </div>
      </div>
    </header>
  );
};
