import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Document {
  id: string;
  name: string;
  selected: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'study-guide' | 'briefing-doc' | 'faq' | 'timeline';
}

interface AppContextType {
  documents: Document[];
  chatMessages: ChatMessage[];
  notes: Note[];
  currentInput: string;
  setCurrentInput: (input: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  toggleDocumentSelection: (id: string) => void;
  selectAllDocuments: () => void;
  addNote: (note: Note) => void;
  addDocument: (document: Document) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Untitled document',
      selected: true
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'user',
      content: 'hello',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'ai',
      content: "I'm sorry, but I couldn't find enough content in the document to answer your query. Try giving me more specific keywords if you think I should know the answer.",
      timestamp: new Date().toISOString()
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([]);
  const [currentInput, setCurrentInput] = useState('');

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const toggleDocumentSelection = (id: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, selected: !doc.selected } : doc
    ));
  };

  const selectAllDocuments = () => {
    const allSelected = documents.every(doc => doc.selected);
    setDocuments(prev => prev.map(doc => ({ ...doc, selected: !allSelected })));
  };

  const addNote = (note: Note) => {
    setNotes(prev => [...prev, note]);
  };

  const addDocument = (document: Document) => {
    setDocuments(prev => [...prev, document]);
  };

  return (
    <AppContext.Provider value={{
      documents,
      chatMessages,
      notes,
      currentInput,
      setCurrentInput,
      addChatMessage,
      toggleDocumentSelection,
      selectAllDocuments,
      addNote,
      addDocument
    }}>
      {children}
    </AppContext.Provider>
  );
};