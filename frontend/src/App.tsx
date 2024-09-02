import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { backend } from 'declarations/backend';
import { CircularProgress, Button, TextField } from '@mui/material';
import { CloudUpload, Folder, InsertDriveFile } from '@mui/icons-material';

type File = {
  id: bigint;
  name: string;
  fileType: string;
  size: bigint | null;
};

type Folder = {
  id: bigint;
  name: string;
};

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchFiles();
    fetchFolders();
  }, []);

  const fetchFiles = async () => {
    try {
      const result = await backend.getFiles();
      setFiles(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const result = await backend.getFolders();
      setFolders(result);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const onSubmit = async (data: { name: string; fileType: string; size: string }) => {
    setLoading(true);
    try {
      await backend.uploadFile(data.name, data.fileType, BigInt(data.size));
      reset();
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      try {
        await backend.createFolder(folderName);
        fetchFolders();
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6">
        <h1 className="text-2xl font-bold mb-6">FileBox</h1>
        <nav>
          <Button
            startIcon={<Folder />}
            onClick={createFolder}
            className="w-full mb-2"
            variant="outlined"
          >
            New Folder
          </Button>
          {folders.map((folder) => (
            <div key={folder.id.toString()} className="mb-2">
              <Folder /> {folder.name}
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="flex space-x-4">
            <TextField {...register('name')} label="File Name" required />
            <TextField {...register('fileType')} label="File Type" required />
            <TextField
              {...register('size')}
              label="Size (bytes)"
              type="number"
              required
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<CloudUpload />}
              disabled={loading}
            >
              Upload
            </Button>
          </div>
        </form>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id.toString()}
                className="bg-white p-4 rounded shadow"
              >
                <InsertDriveFile className="text-blue-500 mb-2" />
                <h3 className="font-bold">{file.name}</h3>
                <p className="text-sm text-gray-600">{file.fileType}</p>
                <p className="text-sm text-gray-600">
                  {file.size ? `${file.size.toString()} bytes` : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
