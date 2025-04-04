import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const UploadForm = () => {
  const [accessId, setAccessId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onDrop = acceptedFiles => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!accessId || !file) {
      return setMessage('Please provide Access ID and file.');
    }

    const formData = new FormData();
    formData.append('accessId', accessId);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/api/files/upload', formData);
      setMessage(`✅ Uploaded! Access ID: ${res.data.accessId}`);
    } catch (err) {
      setMessage(`❌ Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload File</h2>
      <input
        className="w-full border border-gray-600 bg-gray-700 text-white p-2 mb-3 rounded focus:outline-none focus:ring focus:ring-green-500"
        placeholder="Enter Access ID"
        value={accessId}
        onChange={(e) => setAccessId(e.target.value)}
      />

      <div {...getRootProps()} className="border-2 border-dashed border-gray-600 p-4 text-center cursor-pointer mb-3 rounded hover:bg-gray-700 transition duration-200">
        <input {...getInputProps()} />
        {file ? (
          <p>📄 {file.name}</p>
        ) : (
          <p>Drag & drop file here or click to select</p>
        )}
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200"
        onClick={handleUpload}
      >
        Upload
      </button>

      {message && <p className="mt-3 text-sm text-gray-400">{message}</p>}
    </div>
  );
};

export default UploadForm;