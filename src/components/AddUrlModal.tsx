import React, { useState } from 'react';

interface AddUrlModalProps {
  type: 'website' | 'youtube' | 'copied';
  onClose: () => void;
  onInsert: (value: string) => void;
}

const AddUrlModal: React.FC<AddUrlModalProps> = ({ type, onClose, onInsert }) => {
  const [value, setValue] = useState('');

  const isValid = () => {
    if (type === 'copied') return value.trim().length > 0;
    if (type === 'youtube') {
      try {
        const u = new URL(value);
        return u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be');
      } catch {
        return false;
      }
    }
    if (type === 'website') {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  let heading = '';
  let description = '';
  let placeholder = '';
  let notes = null;

  if (type === 'website') {
    heading = 'Website URLs';
    description = 'Paste in web URLs below to upload as sources in NotebookLM.';
    placeholder = 'Paste URLs*';
    notes = (
      <ul className="text-xs text-gray-400 mt-4 list-disc pl-5">
        <li>To add multiple URLs, separate with a space or new line.</li>
        <li>Only the visible text on the website will be imported.</li>
        <li>Paid articles are not supported.</li>
      </ul>
    );
  } else if (type === 'youtube') {
    heading = 'YouTube URL';
    description = 'Paste in a YouTube URL below to upload as a source in NotebookLM.';
    placeholder = 'Paste YouTube URL*';
    notes = (
      <ul className="text-xs text-gray-400 mt-4 list-disc pl-5">
        <li>Only the text transcript will be imported at this moment.</li>
        <li>Only public YouTube videos are supported.</li>
        <li>Recently uploaded videos may not be available to import.</li>
        <li>If upload fails, check common reasons.</li>
      </ul>
    );
  } else if (type === 'copied') {
    heading = 'Paste copied text';
    description = 'Paste your copied text below to upload as a source in NotebookLM';
    placeholder = 'Paste text here*';
    notes = null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl mx-4 p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
        <h2 className="text-2xl font-medium text-white mb-6">{heading}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <textarea
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white mb-2 min-h-[100px]"
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {notes}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => onInsert(value)}
            disabled={!isValid()}
            className={`px-6 py-2 rounded-lg text-white ${isValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}`}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUrlModal; 