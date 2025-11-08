import Test from './pages/test';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '4rem'
          }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                borderBottom: '2px solid #3b82f6',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#2563eb'
              }}>
                Test
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main style={{ height: 'calc(100vh - 4rem)' }}>
        <Test />
      </main>
    </div>
  );
}

export default App;
