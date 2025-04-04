import React, { useState } from 'react';
import axios from 'axios';

const DownloadForm = () => {
  const [accessId, setAccessId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/files/${accessId}`);
      setFileUrl(res.data.fileUrl);
      setError('');
    } catch (err) {
      setError('❌ File not found.');
      setFileUrl('');
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Download File</h2>
      <input
        className="w-full border border-gray-600 bg-gray-700 text-white p-2 mb-3 rounded focus:outline-none focus:ring focus:ring-green-500"
        placeholder="Enter Access ID"
        value={accessId}
        onChange={(e) => setAccessId(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
        onClick={handleDownload}
      >
        Get File
      </button>

      {fileUrl && (
        <p className="mt-4">
          ✅ File ready: <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Click to download</a>
        </p>
      )}

      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
};

export default DownloadForm;