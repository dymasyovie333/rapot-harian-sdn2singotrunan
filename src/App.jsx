import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './pages/InputPage';
import RekapPage from './pages/RekapPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/input" element={<InputPage />} />
        <Route path="/rekap" element={<RekapPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
