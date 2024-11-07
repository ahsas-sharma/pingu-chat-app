import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
function App() {
  return (
    <div className="">
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
