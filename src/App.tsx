import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import StudioPanel from './components/StudioPanel';
import { AppProvider } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState<'sources' | 'chat' | 'studio'>('sources');

  return (
    <AppProvider>
      {/* Tab bar for mobile/tablet */}
      <div className="flex lg:hidden justify-between bg-gray-900 px-2 pt-2 pb-1">
        {['sources', 'chat', 'studio'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'sources' | 'chat' | 'studio')}
            className={`flex-1 py-2 text-center rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'sources' && 'Sources'}
            {tab === 'chat' && 'Chat'}
            {tab === 'studio' && 'Studio'}
          </button>
        ))}
      </div>
      {/* Responsive panels: show one on mobile, all on desktop */}
      <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white gap-y-4 lg:gap-x-6 p-2 md:p-4 lg:p-6">
        {/* Sidebar (Sources) */}
        <div className={`w-full lg:w-80 bg-gray-800 rounded-2xl p-0 shadow-lg flex flex-col overflow-hidden max-h-[40vh] lg:max-h-full ${activeTab === 'sources' ? 'block' : 'hidden'} lg:block`}>
          <Sidebar />
        </div>
        {/* ChatPanel */}
        <div className={`w-full lg:flex-1 bg-gray-800 rounded-2xl p-0 shadow-lg flex flex-col overflow-hidden max-h-[50vh] lg:max-h-full ${activeTab === 'chat' ? 'block' : 'hidden'} lg:block`}>
          <ChatPanel />
        </div>
        {/* StudioPanel */}
        <div className={`w-full lg:w-96 bg-gray-800 rounded-2xl p-0 shadow-lg flex flex-col overflow-hidden max-h-[40vh] lg:max-h-full ${activeTab === 'studio' ? 'block' : 'hidden'} lg:block`}>
          <StudioPanel />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;