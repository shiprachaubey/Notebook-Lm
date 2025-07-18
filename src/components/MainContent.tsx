import React from 'react';
import { useApp } from '../context/AppContext';
import ChatView from './ChatView';
import NotesView from './NotesView';
import SearchView from './SearchView';
import DocumentView from './DocumentView';

interface MainContentProps {
  sidebarCollapsed: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ sidebarCollapsed }) => {
  const { activeView } = useApp();

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatView />;
      case 'notes':
        return <NotesView />;
      case 'search':
        return <SearchView />;
      case 'document':
        return <DocumentView />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default MainContent;