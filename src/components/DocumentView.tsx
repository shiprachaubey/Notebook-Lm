import React from 'react';
import { FileText, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DocumentView: React.FC = () => {
  const { selectedDocument, setActiveView } = useApp();

  if (!selectedDocument) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No document selected</h3>
          <p className="text-gray-600">Select a document from the sidebar to view it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('chat')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{selectedDocument.name}</h2>
            <p className="text-sm text-gray-600">
              {selectedDocument.type} • {selectedDocument.size} • Uploaded {selectedDocument.uploadDate}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Open</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedDocument.content}
                
                {/* Sample content for demonstration */}
                {selectedDocument.content.length < 200 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Abstract</h3>
                    <p>
                      This document explores the integration of artificial intelligence in educational settings, 
                      examining both the opportunities and challenges that arise from AI-powered learning tools. 
                      The research encompasses various educational levels and institutional contexts.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Key Findings</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>AI tools can significantly improve personalized learning experiences</li>
                      <li>Teacher training is crucial for successful AI integration</li>
                      <li>Data privacy and security remain major concerns</li>
                      <li>Student engagement increases with interactive AI applications</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Methodology</h3>
                    <p>
                      Our research methodology included surveys of 500+ educators, interviews with 
                      technology administrators, and analysis of student performance data from 
                      institutions using AI-powered learning platforms.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-900">Conclusion</h3>
                    <p>
                      While AI presents tremendous opportunities for enhancing education, successful 
                      implementation requires careful consideration of ethical implications, proper 
                      training, and ongoing evaluation of outcomes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;