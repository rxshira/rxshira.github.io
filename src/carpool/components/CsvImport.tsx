import React, { useState, useRef } from 'react';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CsvRow {
  full_name: string;
  email: string;
  address: string;
  zip_code: string;
  has_car: boolean;
  phone_number: string;
  [key: string]: any;
}

const CsvImport = () => {
  const [data, setData] = useState<CsvRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCsv = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/ /g, '_'));
    
    const results: CsvRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        let value: any = values[index];
        if (header === 'has_car') value = value?.toLowerCase() === 'yes' || value?.toLowerCase() === 'true';
        row[header] = value;
      });
      
      if (row.email && row.full_name) {
        results.push(row as CsvRow);
      }
    }
    return results;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = parseCsv(text);
        setData(parsed);
        setError(null);
      } catch (err) {
        setError("Failed to parse CSV. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const startImport = async () => {
    setImporting(true);
    setProgress(0);
    let imported = 0;

    for (const row of data) {
      try {
        // Check if user already exists
        const q = query(collection(db, 'carpool_users'), where('email', '==', row.email));
        const snap = await getDocs(q);
        
        if (snap.empty) {
          await addDoc(collection(db, 'carpool_users'), {
            ...row,
            access_status: 'pending',
            is_admin: false,
            created_at: serverTimestamp(),
            // Initial dummy coordinates
            latitude: 37.3382,
            longitude: -121.8863,
          });
          imported++;
        }
      } catch (err) {
        console.error("Import error for row:", row, err);
      }
      setProgress(Math.round(((imported + 1) / data.length) * 100));
    }

    setSuccess(`Successfully imported ${imported} new users.`);
    setData([]);
    setImporting(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-8 text-center relative overflow-hidden group">
        <input 
          type="file" 
          accept=".csv" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-pink/10 flex items-center justify-center border border-pink/30 group-hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all">
            <Upload className="text-pink w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Import Intern CSV</h3>
            <p className="text-text-gray text-xs mt-1">
              Required columns: full_name, email, address, zip_code, phone_number, has_car
            </p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="btn text-xs"
          >
            Select File
          </button>
        </div>
      </div>

      <AnimatePresence>
        {data.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 border border-white/10 overflow-hidden"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-pink">
                Preview ({data.length} rows detected)
              </span>
              <button onClick={() => setData([])} className="text-text-gray hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-left text-[10px]">
                <thead className="bg-black/20 sticky top-0">
                  <tr className="uppercase font-bold text-text-gray">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Address</th>
                    <th className="p-2 text-center">Car</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.slice(0, 10).map((row, i) => (
                    <tr key={i} className="text-text-gray">
                      <td className="p-2 font-bold text-white">{row.full_name}</td>
                      <td className="p-2">{row.email}</td>
                      <td className="p-2">{row.address}</td>
                      <td className="p-2 text-center">{row.has_car ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                  {data.length > 10 && (
                    <tr>
                      <td colSpan={4} className="p-2 text-center italic opacity-50">
                        ... and {data.length - 10} more rows
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end">
              <button 
                onClick={startImport}
                disabled={importing}
                className="btn bg-pink border-pink w-full md:w-auto"
              >
                {importing ? `Importing ${progress}%` : `Import ${data.length} Users`}
              </button>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/50 p-4 flex items-center gap-3 text-green-500 text-sm font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/50 p-4 flex items-center gap-3 text-red-500 text-sm font-bold"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CsvImport;
