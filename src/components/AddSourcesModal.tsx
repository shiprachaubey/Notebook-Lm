import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Presentation, Link, Globe, Youtube, Copy, ToggleLeft } from 'lucide-react';
import useDrivePicker from 'react-google-drive-picker';
import AddUrlModal from './AddUrlModal';

interface AddSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSource: (source: any) => void;
}

const AddSourcesModal: React.FC<AddSourcesModalProps> = ({ isOpen, onClose, onAddSource }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openPicker] = useDrivePicker();
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlType, setUrlType] = useState<'website' | 'youtube' | 'copied' | null>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newSource = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : 'TXT',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toLocaleDateString(),
        content: `Content of ${file.name}...`,
        selected: true
      };
      onAddSource(newSource);
    });
    onClose();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleGoogleDocsClick = () => {
    openPicker({
      clientId: '893076155555-tplatiiif9m76nvkmvr2pu9tf7e33mg8.apps.googleusercontent.com', // <-- yahan apna client id daalein
      developerKey: 'AIzaSyCJ_W0PzBZXqzH8HHjYwWHD9VsxtBHIr9g', // <-- yahan apna developer key daalein
      viewId: 'DOCUMENTS', // Sirf Google Docs dikhane ke liye
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          // Yahan aap apne document ko add kar sakte hain
          // onAddSource(data.docs[0]) etc.
        }
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-medium text-white">NotebookLM</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">Add sources</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span>Discover sources</span>
            </button>
          </div>

          <p className="text-gray-300 mb-2">
            Sources let NotebookLM base its responses on the information that matters most to you.
          </p>
          <p className="text-gray-400 mb-8">
            (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)
          </p>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Upload sources</h3>
                <p className="text-gray-400">
                  Drag and drop or{' '}
                  <button
                    onClick={handleChooseFile}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    choose file
                  </button>
                  {' '}to upload
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt,.md,.mp3,.wav,.m4a"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Source Options */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {/* Google Drive */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">G</span>
                </div>
                <span className="text-white font-medium">Google Drive</span>
              </div>
              <div className="space-y-2">
                <button onClick={handleGoogleDocsClick} className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Google Docs</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors">
                  <Presentation className="w-4 h-4" />
                  <span>Google Slides</span>
                </button>
              </div>
            </div>

            {/* Link */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <Link className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Link</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => { setUrlType('website'); setShowUrlModal(true); }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </button>
                <button
                  onClick={() => { setUrlType('youtube'); setShowUrlModal(true); }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </button>
              </div>
            </div>

            {/* Paste text */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">Paste text</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => { setUrlType('copied'); setShowUrlModal(true); }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copied text</span>
                </button>
              </div>
            </div>
          </div>

          {/* Source Limit */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-white">Source limit</span>
              <div className="w-8 h-4 bg-blue-600 rounded-full flex items-center justify-end pr-1">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-white">
              <span className="text-lg font-medium">1</span>
              <span className="text-gray-400">/50</span>
            </div>
          </div>
        </div>
      </div>
      {showUrlModal && urlType && (
        <AddUrlModal
          type={urlType}
          onClose={() => setShowUrlModal(false)}
          onInsert={(value) => {
            onAddSource({ type: urlType, value });
            setShowUrlModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AddSourcesModal;