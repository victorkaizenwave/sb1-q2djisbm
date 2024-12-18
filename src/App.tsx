import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientView from './views/ClientView';
import CreatorView from './views/CreatorView';
import ExecutiveView from './views/ExecutiveView';
import LandingPage from './pages/LandingPage';
import Navigation from './components/layout/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/executive" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <ExecutiveView />
              </main>
            </>
          } />
          <Route path="/client" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <ClientView />
              </main>
            </>
          } />
          <Route path="/creator" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <CreatorView />
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;