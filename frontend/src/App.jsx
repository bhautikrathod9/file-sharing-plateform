import React from 'react';
import UploadForm from './components/UploadForm';
import DownloadForm from './components/DownloadForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">📁 OneKey FileShare</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <UploadForm />
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <DownloadForm />
        </div>
      </div>
    </div>
  );
}

export default App;
