import React from 'react';
import { Plus, Search, Square, CheckSquare, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddSourcesModal from './AddSourcesModal';
import DiscoverModal from './DiscoverModal';

const Sidebar: React.FC = () => {
  const { documents, toggleDocumentSelection, selectAllDocuments, addDocument } = useApp();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showDiscoverModal, setShowDiscoverModal] = React.useState(false);
  const allSelected = documents.every(doc => doc.selected);

  const handleAddSource = (source: any) => {
    addDocument(source);
  };

  return (
    <>
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-medium text-white mb-4">Sources</h1>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          <button
            onClick={() => setShowDiscoverModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Discover</span>
          </button>
        </div>

        {/* Select All */}
        <div className="flex items-center space-x-3 py-2">
          <button
            onClick={selectAllDocuments}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            {allSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span className="text-sm">Select all sources</span>
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
              onClick={() => toggleDocumentSelection(doc.id)}
            >
              {doc.selected ? (
                <CheckSquare className="w-4 h-4 text-blue-400" />
              ) : (
                <Square className="w-4 h-4 text-gray-400" />
              )}
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{doc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

      <AddSourcesModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddSource={handleAddSource}
      />
      {showDiscoverModal && (
        <DiscoverModal
          isOpen={showDiscoverModal}
          onClose={() => setShowDiscoverModal(false)}
          onSubmit={() => setShowDiscoverModal(false)}
          onCurious={() => setShowDiscoverModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;