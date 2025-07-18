import React, { useState } from 'react';
import { FileText, File, Trash2, Eye, MoreVertical, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DocumentListProps {
  collapsed: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ collapsed }) => {
  const { documents } = useApp();
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const getFileIcon = () => <FileText className="w-4 h-4 text-blue-500" />;

  // Dummy handlers for now
  const handleDocumentClick = (doc: any) => {};
  const deleteDocument = (id: string) => {};
  const updateDocument = (id: string, update: any) => {};

  const handleRename = (doc: any) => {
    setEditingId(doc.id);
    setEditValue(doc.name);
    setMenuOpenId(null);
  };

  const handleRenameSave = (doc: any) => {
    if (editValue.trim() && editValue !== doc.name) {
      updateDocument(doc.id, { name: editValue.trim() });
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="group relative p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
          onClick={() => handleDocumentClick(doc)}
        >
          {/* Three-dot menu, only on hover */}
          <div
            className="relative mr-2"
            onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === doc.id ? null : doc.id); }}
          >
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 focus:outline-none">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
            {/* Dropdown menu */}
            {menuOpenId === doc.id && (
              <div className="absolute left-0 mt-2 z-20 bg-gray-900 rounded-xl shadow-lg py-2 w-44 border border-gray-700">
                <button
                  className="flex items-center w-full px-4 py-2 text-blue-300 hover:bg-gray-800 hover:text-blue-400 text-sm gap-2"
                  onClick={e => { e.stopPropagation(); deleteDocument(doc.id); setMenuOpenId(null); }}
                >
                  <Trash2 className="w-4 h-4" /> Remove source
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-blue-300 hover:bg-gray-800 hover:text-blue-400 text-sm gap-2"
                  onClick={e => { e.stopPropagation(); handleRename(doc); }}
                >
                  <Edit3 className="w-4 h-4" /> Rename source
                </button>
              </div>
            )}
          </div>
          {getFileIcon()}
          {!collapsed && (
            <div className="flex-1 min-w-0 ml-3">
              {editingId === doc.id ? (
                <input
                  className="text-sm font-medium border border-blue-400 rounded px-2 py-1 w-full bg-white text-gray-900 focus:outline-none"
                  value={editValue}
                  autoFocus
                  onClick={e => e.stopPropagation()}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => handleRenameSave(doc)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleRenameSave(doc);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
              ) : (
                <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentList;