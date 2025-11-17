import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({ onExport, onImport }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold mb-2 text-yellow-300">MARVEL CHAMPIONS</h1>
          <p className="text-xl text-gray-300">Ultimate Randomizer con Collection Tracking</p>
        </div>
        <div className="flex-1 flex justify-end gap-3">
          <button
            onClick={onExport}
            className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
            title="Export all data to JSON"
          >
            <Download size={18} />
            Export All
          </button>
          <button
            onClick={handleImportClick}
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
            title="Import data from JSON"
          >
            <Upload size={18} />
            Import All
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
