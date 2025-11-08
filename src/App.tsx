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
      <main className="h-screen">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
