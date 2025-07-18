import React from 'react';
import { HelpCircle, Plus, BookOpen, FileText, HelpCircle as FAQ, Clock, MoreVertical, Maximize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const StudioPanel: React.FC = () => {
  const { notes, addNote } = useApp();

  const handleGenerateAudioOverview = () => {
    // Simulate audio overview generation
    console.log('Generating audio overview...');
  };

  const handleAddNote = (type: 'study-guide' | 'briefing-doc' | 'faq' | 'timeline') => {
    const noteTypes = {
      'study-guide': 'Study guide',
      'briefing-doc': 'Briefing doc',
      'faq': 'FAQs',
      'timeline': 'Timeline'
    };

    const newNote = {
      id: Date.now().toString(),
      title: noteTypes[type],
      content: `Generated ${noteTypes[type].toLowerCase()} content...`,
      type
    };

    addNote(newNote);
  };

  return (
    <div className="flex flex-col h-full p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Studio</h2>
        <button className="p-1 text-gray-400 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Audio Overview Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Audio Overview</h3>
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-blue-400 text-sm">
            <span>🎵</span>
            <span>Create an Audio Overview in more languages!</span>
            <button className="text-blue-400 hover:text-blue-300 underline">Learn more</button>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-sm">🎙️</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Deep Dive conversation</h4>
                <p className="text-xs text-gray-400">Two hosts</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors">Customise</button>
              <button 
                onClick={handleGenerateAudioOverview}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Notes</h3>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg text-gray-400 hover:text-gray-300 transition-colors mb-4">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add note</span>
        </button>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={() => handleAddNote('study-guide')}
            className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Study guide</span>
          </button>
          <button 
            onClick={() => handleAddNote('briefing-doc')}
            className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Briefing doc</span>
          </button>
          <button 
            onClick={() => handleAddNote('faq')}
            className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <FAQ className="w-4 h-4" />
            <span>FAQs</span>
          </button>
          <button 
            onClick={() => handleAddNote('timeline')}
            className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </div>
        {notes.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h4 className="text-sm font-medium text-white mb-2">Saved notes will appear here</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Save a chat message to create a new note or click Add note above.
            </p>
          </div>
        )}
        {notes.length > 0 && (
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-1">{note.title}</h4>
                <p className="text-xs text-gray-400">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Image */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-700 rounded-lg p-2">
          <div className="w-full h-16 bg-gray-600 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">Preview Image</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPanel;