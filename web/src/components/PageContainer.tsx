import React from 'react';

interface PageContainerProps {
  title: string;
  subtitle: string;
  actionButton?: React.ReactNode;
  filters?: React.ReactNode;
  totalCountText?: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  actionButton,
  filters,
  totalCountText,
  children,
}) => {
  return (
    <main className="main-content">
      <div className="page-header-container">
        <div className="title-action-row">
          <div className="page-title-group">
            <h1 className="page-title">{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
          {actionButton}
        </div>

        {filters && <div className="filters-row">{filters}</div>}

        {totalCountText && (
          <div className="candidate-count-text">{totalCountText}</div>
        )}
      </div>

      {children}
    </main>
  );
};
