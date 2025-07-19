import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DailyLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/daily-logs/')
      .then(res => res.json())
      .then(setLogs)
      .catch(() => setError('Failed to load daily logs.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center bg-black pt-24 pb-12 relative">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-0 flex">
          <div className="border-l border-gray-700 h-full" style={{width: 0}}></div>
          <div className="flex-1"></div>
          <div className="border-r border-gray-700 h-full" style={{width: 0}}></div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-300 mb-8 text-center z-10 relative">Daily Logs</h1>
        <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col gap-0 mt-4 relative px-4 sm:px-8 z-10">
          <div className="relative z-10">
            {loading ? (
              <div className="w-full flex justify-center items-center py-8"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mr-2"></span> <span>Loading...</span></div>
            ) : error ? (
              <div className="w-full text-center text-red-400 py-4">{error}</div>
            ) : !logs.length ? (
              <div className="w-full text-center text-gray-400 py-4">No daily logs found.</div>
            ) : (
              <div className="w-full flex flex-col gap-6">
                {logs.map(log => (
                  <div key={log.id} className="bg-black border border-gray-700 rounded-xl shadow p-6 flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className="font-semibold text-indigo-200 text-lg">{new Date(log.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        <span className="font-semibold text-indigo-400">Activities:</span>
                        <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">{log.activities}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-indigo-400">New Things Tried:</span>
                        <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">{log.new_things_tried}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-indigo-400">Improvement:</span>
                        <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">{log.improvement}</p>
                      </div>
                      {log.notes && (
                        <div>
                          <span className="font-semibold text-indigo-400">Notes:</span>
                          <p className="text-gray-400 text-xs mt-1 whitespace-pre-line">{log.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="my-4 w-full flex justify-center relative z-10">
            <div className="border-t border-gray-700 w-screen absolute left-1/2 -translate-x-1/2" style={{zIndex: 1}}></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DailyLog; 