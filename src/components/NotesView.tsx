import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Tag, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotesView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useApp();
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  const handleCreateNote = () => {
    if (!newNote.title.trim()) return;

    const note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      timestamp: new Date().toISOString(),
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    addNote(note);
    setNewNote({ title: '', content: '', tags: '' });
    setShowNewNoteForm(false);
  };

  const handleUpdateNote = (id: string, updates: any) => {
    updateNote(id, updates);
    setEditingNote(null);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
            <p className="text-sm text-gray-600">Organize your thoughts and insights</p>
          </div>
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* New Note Form */}
        {showNewNoteForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full text-lg font-medium border-none outline-none mb-3"
            />
            <textarea
              placeholder="Start writing..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full h-32 resize-none border-none outline-none mb-3"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newNote.tags}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              className="w-full text-sm border-none outline-none mb-3 text-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewNoteForm(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {editingNote === note.id ? (
                <div>
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => handleUpdateNote(note.id, { title: e.target.value })}
                    className="w-full text-lg font-medium border-none outline-none mb-3"
                  />
                  <textarea
                    value={note.content}
                    onChange={(e) => handleUpdateNote(note.id, { content: e.target.value })}
                    className="w-full h-32 resize-none border-none outline-none mb-3"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingNote(null)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingNote(null)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingNote(note.id)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{note.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(note.timestamp)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {notes.length === 0 && !showNewNoteForm && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
            <p className="text-gray-600 mb-4">Start by creating your first note</p>
            <button
              onClick={() => setShowNewNoteForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;