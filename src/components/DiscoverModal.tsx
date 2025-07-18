import React, { useState } from 'react';

interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (query: string) => void;
  onCurious?: () => void;
}

const DiscoverModal: React.FC<DiscoverModalProps> = ({ isOpen, onClose, onSubmit, onCurious }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-xl mx-4 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
        <h2 className="text-2xl font-medium text-white mb-8">What are you interested in?</h2>
        <textarea
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white mb-6 min-h-[100px]"
          placeholder={"Describe something that you'd like to learn about or click 'I'm feeling curious' to explore a new topic."}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCurious}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center space-x-2"
            type="button"
          >
            <span role="img" aria-label="curious">🔍</span>
            <span>I'm feeling curious</span>
          </button>
          <button
            onClick={() => onSubmit(query)}
            disabled={!query.trim()}
            className={`px-6 py-2 rounded-lg text-white ${query.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}`}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverModal; 