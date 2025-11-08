import { useState } from 'react';
import OrganicCanvas from './pages/organicCanvas';
import ChatCanvas from './pages/chatCanvas';
import Test from './pages/test';

type Page = 'test' | 'organicCanvas' | 'chatCanvas';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('test');

  const renderPage = () => {
    switch (currentPage) {
      case 'test':
        return <Test />;
      case 'organicCanvas':
        return <OrganicCanvas />;
      case 'chatCanvas':
        return <ChatCanvas />;
      default:
        return <Test />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage('test')}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors ${
                  currentPage === 'test'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Test
              </button>
              <button
                onClick={() => setCurrentPage('organicCanvas')}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors ${
                  currentPage === 'organicCanvas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Organic Canvas
              </button>
              <button
                onClick={() => setCurrentPage('chatCanvas')}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors ${
                  currentPage === 'chatCanvas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Chat Canvas
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="h-[calc(100vh-4rem)]">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
