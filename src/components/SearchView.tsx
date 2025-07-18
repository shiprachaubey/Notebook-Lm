import React, { useState, useMemo } from 'react';
import { Search, FileText, MessageSquare, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SearchView: React.FC = () => {
  const { documents, notes, chatMessages, searchQuery, setSearchQuery } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: any[] = [];
    const query = searchQuery.toLowerCase();

    // Search documents
    if (activeFilter === 'all' || activeFilter === 'documents') {
      documents.forEach(doc => {
        if (doc.name.toLowerCase().includes(query) || doc.content.toLowerCase().includes(query)) {
          results.push({
            type: 'document',
            id: doc.id,
            title: doc.name,
            content: doc.content,
            metadata: `${doc.type} • ${doc.size}`,
            timestamp: doc.uploadDate
          });
        }
      });
    }

    // Search notes
    if (activeFilter === 'all' || activeFilter === 'notes') {
      notes.forEach(note => {
        if (note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)) {
          results.push({
            type: 'note',
            id: note.id,
            title: note.title,
            content: note.content,
            metadata: note.tags.join(', '),
            timestamp: note.timestamp
          });
        }
      });
    }

    // Search chat messages
    if (activeFilter === 'all' || activeFilter === 'chat') {
      chatMessages.forEach(message => {
        if (message.content.toLowerCase().includes(query)) {
          results.push({
            type: 'chat',
            id: message.id,
            title: message.type === 'user' ? 'Your message' : 'AI response',
            content: message.content,
            metadata: message.type,
            timestamp: message.timestamp
          });
        }
      });
    }

    return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [searchQuery, activeFilter, documents, notes, chatMessages]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'note':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Search</h2>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search across all your content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Filter by:</span>
          </div>
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'documents', label: 'Documents' },
              { id: 'notes', label: 'Notes' },
              { id: 'chat', label: 'Chat' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchQuery.trim() ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={`${result.type}-${result.id}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(result.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                        <span className="text-sm text-gray-500">{formatDate(result.timestamp)}</span>
                      </div>
                      
                      <p 
                        className="text-gray-700 mb-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightText(
                            result.content.length > 200 
                              ? result.content.substring(0, 200) + '...' 
                              : result.content, 
                            searchQuery
                          )
                        }}
                      />
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="capitalize">{result.type}</span>
                        {result.metadata && (
                          <>
                            <span>•</span>
                            <span>{result.metadata}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search your content</h3>
            <p className="text-gray-600">Enter a search term to find documents, notes, and chat messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;