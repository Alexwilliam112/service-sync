// TemporaryPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TemporaryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect back to the first page
    }, 100); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div>
      <h1>Temporary Page</h1>
    </div>
  );
};

export default TemporaryPage;