import React, { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import PatientProfile from './PatientProfile';

function App() {
  const user = { role: 'doctor' }; 

  return (
    <Router>
      <Routes>
        {/* Doctor Routes */}
        {user.role === 'doctor' && (
          <>
            <Route path="/" element={<SearchPage />} />
            <Route path="/profile/:id" element={<PatientProfile showSearchButton={true} />} />
            <Route path="/main" element={<Navigate to="/main.html" />} />
          </>
        )}

        {/* Patient Routes */}
        {user.role === 'patient' && (
          <>
            <Route path="/profile/:id" element={<PatientProfile showSearchButton={false} />} />
            <Route path="/main" element={<Navigate to="/main.html" />} />
          </>
        )}

        {/* Admin Routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/" element={<Navigate to="/dashboard.html" replace />} /> {/* Dashboard is main */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile/:id" element={<PatientProfile showSearchButton={true} />} />
            {/* These routes handle the .html pages directly */}
            <Route path="/dashboard.html" element={() => {
              window.location.href = '/dashboard.html';
              return null;
            }} />
            <Route path="/admin2.html" element={() => {
              window.location.href = '/admin2.html';
              return null;
            }} />
            <Route path="/doctor.html" element={() => {
              window.location.href = '/doctor.html';
              return null;
            }} />
            <Route path="/patient.html" element={() => {
              window.location.href = '/patient.html';
              return null;
            }} />
            <Route path="/main.html" element={() => {
              window.location.href = '/main.html';
              return null;
            }} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
